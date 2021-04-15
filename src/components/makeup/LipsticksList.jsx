// import react
import React, {useState, useEffect, useRef} from 'react';

// import antd icon
import {HeartOutlined} from "@ant-design/icons";

// import customized hook
import {useWindowDimensions, useEleDimensions, useScrollTop, useEleDistanceToTop} from '../../custimizedHook/elementPositions'

// import components
import MakeupItem from "./MakeupItem";

function LipsticksList(props) {
  // init lipsticks state
  const [lipsticks, setLipsticks] = useState([]);

  // calculate screen height, after component mounted and updated
  const { height } = useWindowDimensions();

  // calculate scroll top
  const { scrollTop } = useScrollTop();

  // get binded list element
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
  const { elementWidth } = useEleDimensions(listEleRef)

  // calculate binded list element distance to page top
  const distanceToTop = useEleDistanceToTop(listEleRef);

  const itemHeight = 361;
  const itemWidth = 206;
  const itemsPerRow = Math.floor(elementWidth / itemWidth); // the number of item per row
  const listTotalHeight = Math.ceil(lipsticks.length / itemsPerRow) * itemHeight; // the total height of list
  //const visibleItemsCount = Math.ceil(height / itemHeight) * itemsPerRow; // the number of items that falls within the visible screen
  const visibleRowsCount = Math.ceil(height / itemHeight); // visible screen can contain how many rows
  const startIndex = Math.floor((scrollTop - distanceToTop) / itemHeight); // the start position (row) falls within visible screen
  const endIndex = startIndex + visibleRowsCount; // the end position (row) falls within visible screen
  const startOffset = scrollTop <= distanceToTop ? 0 : (scrollTop - distanceToTop) - ((scrollTop - distanceToTop) % itemHeight);
  const dataItemStart = startIndex <= 0 ? 0 : (startIndex * itemsPerRow);
  const dataItemEnd = (endIndex * itemsPerRow);
  const visibleItems = lipsticks.slice(dataItemStart, dataItemEnd);
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
  const iElementLength =  Math.floor(elementWidth / itemWidth);
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
      <div className="makeup-wrapper" style={{height: listTotalHeight?listTotalHeight:0}}>
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