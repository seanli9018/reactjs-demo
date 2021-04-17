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
  const listWrapperRef = useRef(null);

  // fetch lipsticks data, and set state
  useEffect(() => {
    React.$http.getLipSticks().then(res => {
      setLipsticks(res.data);
    }).catch(err => {
      console.log(err)
    })
  }, [])

  // get list element width
  const elementWidth = useEleDimensions(listEleRef);

  // calculate binded list element distance to page top
  const eleDistanceToTop = useEleDistanceToTop(listWrapperRef);

  const itemHeight = 361;
  const itemWidth = 206;
  const itemsPerRow = Math.floor(elementWidth / itemWidth); // the number of item per row
  const listTotalHeight = Math.ceil(lipsticks.length / itemsPerRow) * itemHeight; // the total height of list
  const visibleRowsCount = Math.ceil(height / itemHeight) + 1; // visible screen can contain how many rows
  const startIndex = Math.floor((scrollTop - eleDistanceToTop) / itemHeight); // the start position (row) falls within visible screen
  const endIndex = startIndex + visibleRowsCount; // the end position (row) falls within visible screen
  const startOffset = (scrollTop <= eleDistanceToTop) ? 0 : (scrollTop - eleDistanceToTop) - ((scrollTop - eleDistanceToTop) % itemHeight);
  const dataItemStart = startIndex <= 0 ? 0 : (startIndex * itemsPerRow);
  const dataItemEnd = (endIndex * itemsPerRow);
  const visibleItems = lipsticks.slice(dataItemStart, dataItemEnd);

  // prepare lipsticks elements
  const lipsticksElement = visibleItems && visibleItems.map(lipstickItem => {
    return <MakeupItem key={lipstickItem.id} makeupItem={lipstickItem} />
  })

  // prepare blank item to prevent flex display gap
  let iElement = [];
  const iElementLength =  Math.floor(elementWidth / itemWidth);
  for(let i=0; i<iElementLength; i++) {
    iElement.push(<i key={i}></i>)
  }

  const getTransform = () => {
    return `translate3d(0,${startOffset}px,0)`
  }

  return (
    <>
      <h3><HeartOutlined /> Lipsticks </h3>
      <div className="makeup-wrapper" ref={listWrapperRef} style={{height: listTotalHeight?listTotalHeight:0}}>
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