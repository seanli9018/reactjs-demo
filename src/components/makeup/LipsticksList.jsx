// import react
import React, {useState, useEffect} from 'react';

// import antd icon
import { HeartOutlined } from "@ant-design/icons";

// import components
import MakeupItem from "./MakeupItem";
import VerticalScrollVirtualList from '../utils/VerticalScrollVirtualList';

function LipsticksList(props) {
  // init state
  const [lipsticks, setLipsticks] = useState([]);

  // fetch lipsticks data, and set state
  useEffect(() => {
    React.$http.getLipSticks().then(res => {
      setLipsticks(res.data);
    }).catch(err => {
      console.log(err)
    })
  }, [])

  // prepare func to generate list items. visibleItems are passed in by the parent component VerticalScrollVirtualList
  const renderChildren = (visibleItems) => {
    if (visibleItems) {
      return visibleItems.map((item) => {
        return <MakeupItem key={item.id} makeupItem={item} handleClick={()=>{routeTo(item)}}/>
      })
    }
    return null;
  }
  //handle item click
  function routeTo(item) {
    props.history.push({pathname: `/detail/makeups/${item.id}`, state: {data: item}})
  }

  return (
    <>
      <h3><HeartOutlined /> Lipsticks </h3>
      <VerticalScrollVirtualList list={lipsticks} itemDimensions={{width: 206, height: 361}}>
        {/* VerticalScrollVirtualList takes a function as children.
        function should take visibleItems as argument and loop the argument to return a item list*/}
        { renderChildren }
      </VerticalScrollVirtualList>
    </>
  )
}

export default LipsticksList;