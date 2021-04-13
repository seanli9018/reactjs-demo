// import react
import React, {useState, useEffect, useRef} from 'react';

// import antd icon
import {HeartOutlined} from "@ant-design/icons";

// import custimized hook
import {useWindowDimensions, useScrollTop} from '../../custimizedHook/WindowDimensions'

// import components
import MakeupItem from "./MakeupItem";

function LipsticksList(props) {
  // init lipsticks state
  const [lipsticks, setLipsticks] = useState([]);
  const [listWidth, setListWidth] = useState(0);

  // calculate screen height, after component mounted and updated
  const { height, width } = useWindowDimensions();

  // calculate scroll top
  const { scrollTop, scrolling } = useScrollTop();
  // console.log(scrollTop)
  // console.log(scrolling)
  
  const listEleRef = useRef(null);
  // fetch lipsticks data, and set state
  useEffect(() => {
    React.$http.getLipSticks().then(res => {
      setLipsticks(res.data);
    }).catch(err => {
      console.log(err)
    })
  }, [])

  // get list element width
  useEffect(() => {
    if(listEleRef.current) {
      setListWidth(listEleRef.current.offsetWidth);
    }
  });

  const itemHeight = 361;
  const itemWidth = 206;
  const itemsPerRow = Math.floor(listWidth / itemWidth); // the number of item per row
  const listTotalHeight = Math.ceil(lipsticks.length / itemsPerRow) * itemHeight; // the total height of list
  //const visibleItemsCount = Math.ceil(height / itemHeight) * itemsPerRow; // the number of items that falls within the visible screen
  const visibleRowsCount = Math.ceil(height / itemHeight); // visible screen can contain how many rows
  const startIndex =  Math.floor((scrollTop - 580) / itemHeight); // the start position (row) falls within visible screen
  const endIndex = startIndex + visibleRowsCount; // the end position (row) falls within visible screen 
  const dataItemStart = startIndex <= 0 ? 0 : (startIndex * itemsPerRow);
  const dataItemEnd = (endIndex * itemsPerRow);
  const visibleItems = lipsticks.slice(dataItemStart, dataItemEnd);
  const startOffset = scrollTop <= 580 ? 0 : (scrollTop - 580) - ((scrollTop - 580) % itemHeight);

  const preVisibleItems = lipsticks.slice(dataItemStart - itemsPerRow, dataItemStart)
 
  // prepare lipsticks elements
  const lipsticksElement = visibleItems && visibleItems.map(lipstickItem => {
    return <MakeupItem key={lipstickItem.id} makeupItem={lipstickItem} />
  })

  const preLipsticksElement = preVisibleItems && preVisibleItems.map(lipstickItem => {
    return <MakeupItem key={lipstickItem.id} makeupItem={lipstickItem} />
  })

  // prepare blank item
  let iElement = [];
  const iElementLength =  Math.floor(listWidth / itemWidth);
  for(let i=0; i<iElementLength; i++) {
    iElement.push(<i key={i}></i>)
  }

  const getTransform = () => {
    return `translate3d(0,${startOffset}px,0)`
  }

  const getPrevTransform = () => {
    return `translate3d(0,${startOffset - itemHeight}px,0)`
  }

  return (
    <>
      <h3><HeartOutlined /> Lipsticks </h3>
      <div className="makeup-wrapper" style={{height: listTotalHeight}}>
        <ul className="makeup-list" style={{ transform: getPrevTransform()}}>
          {preLipsticksElement}
        </ul>
        <ul className="makeup-list" ref={listEleRef} style={{ transform: getTransform() }}>
          {lipsticksElement}
          {/* for filling the gap of flex */}
          {iElement}
        </ul>
      </div>
    </>
  )
}

export default LipsticksList;