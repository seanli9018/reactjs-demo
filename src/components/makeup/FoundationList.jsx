// import react
import React, {useState, useEffect} from 'react';

// import antd icon
import { HeartOutlined } from "@ant-design/icons";

// import components
import MakeupItem from "./MakeupItem";
import VerticalScrollVirtualList from '../utils/VerticalScrollVirtualList';

function FoundationList(props) {
  // init state
  const [foundation, setFoundation] = useState([]);

  // fetch nail polish data, and set state
  useEffect(() => {
    React.$http.getFoundation().then(res => {
      setFoundation(res.data);
    }).catch(err => {
      console.log(err)
    })
  }, [])

  // prepare func to generate list items. visibleItems are passed in by the parent component VerticalScrollVirtualList
  const renderChildren = (visibleItems) => {
    if (visibleItems) {
      return visibleItems.map(item => {
        return <MakeupItem key={item.id} makeupItem={item} />
      })
    }
    return null;
  }

  return (
    <>
      <h3><HeartOutlined /> Foundation </h3>
      <VerticalScrollVirtualList list={foundation} itemDimensions={{width: 206, height: 361}}>
        {/* VerticalScrollVirtualList takes a function as children.
        function should take visibleItems as argument and loop the argument to return a item list*/}
        { renderChildren }
      </VerticalScrollVirtualList>
    </>
  )
}

export default FoundationList;