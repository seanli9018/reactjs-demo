// import react
import React, { useRef } from 'react';
import PropTypes from "prop-types";

// import customized hook
import {useWindowDimensions, useElementGetBoundingClientRect, useScrollTop, useEleDistanceToTop} from '../../custimizedHook/elementPositions'

function VerticalScrollVirtualList(props) {
  // get data (props.list)
  const list = props.list;
  const listLength = list.length;

  // get props.itemDimensions
  const itemDimensions = props.itemDimensions;

  // calculate screen height, after component mounted and updated
  const { height } = useWindowDimensions();

  // calculate scroll top
  const { scrollTop } = useScrollTop();

  // get bind list element
  const listEleRef = useRef(null);
  const listWrapperRef = useRef(null);

  // get list element width
  const { width: elementWidth } = useElementGetBoundingClientRect(listEleRef);
  // calculate bind list element distance to page top
  const eleDistanceToTop = useEleDistanceToTop(listWrapperRef);

  // generate visible data items based on item dimensions, list position and window dimensions (visible area dimensions)
  const itemHeight = itemDimensions.height; // item height
  const itemWidth = itemDimensions.width; // item width
  const itemsPerRow = Math.floor(elementWidth / itemWidth); // the number of item per row
  const listTotalHeight = Math.ceil(listLength / itemsPerRow) * itemHeight; // the total height of list
  const visibleRowsCount = Math.ceil(height / itemHeight) + 1; // visible screen can contain how many rows
  const startIndex = Math.floor((scrollTop - eleDistanceToTop) / itemHeight); // the start position (row) index falls within visible screen
  const endIndex = startIndex + visibleRowsCount; // the end position (row) index falls within visible screen
  const startOffset = (scrollTop <= eleDistanceToTop) ? 0 : (scrollTop - eleDistanceToTop) - ((scrollTop - eleDistanceToTop) % itemHeight);// use for list ul transformation
  const dataItemStart = startIndex <= 0 ? 0 : (startIndex * itemsPerRow); // data item start index
  const dataItemEnd = (endIndex * itemsPerRow); // data item end index
  const visibleItems = list.slice(dataItemStart, dataItemEnd); // slice all data to visible area data items based on data item start & end index

  // prepare blank item to prevent flex display gap
  let iElement = [];
  const iElementLength =  Math.floor(elementWidth / itemWidth);
  for(let i=0; i<iElementLength; i++) {
    iElement.push(<i key={i} style={{width: itemWidth, height: 0}}></i>)
  }

  // prepare list css animation/translate3d
  const getTransform = () => {
    return `translate3d(0,${startOffset}px,0)`
  }

  // prepare list wrapper div style
  const listWrapperStyle = {
    'position': 'relative',
    'height': listTotalHeight ? listTotalHeight : 0
  }

  // prepare list ul style
  const listStyle = {
    'listStyle': 'none',
    'display': 'flex',
    'flexDirection': 'row',
    'justifyContent': 'space-between',
    'flexWrap': 'wrap',
    'padding': 0,
    'marginBottom': 0,
    'backgroundColor': 'rgba(255, 255, 255, 0)',
    'transform': getTransform()
  }

  return (
    <>
      <div className="list-wrapper" ref={listWrapperRef} style={listWrapperStyle}>
        <ul className="makeup-list" ref={listEleRef} style={listStyle}>
          {props.children(visibleItems)}
          {/* iElement is for filling the gap of flex */}
          {iElement}
        </ul>
      </div>
    </>
  )
}

VerticalScrollVirtualList.propTypes = {
  list: PropTypes.array.isRequired,
  itemDimensions: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired
}

export default VerticalScrollVirtualList;