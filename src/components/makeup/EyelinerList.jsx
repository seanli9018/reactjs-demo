// import react
import React from 'react';

// import antd icon
import { HeartOutlined } from "@ant-design/icons";

// import components
import MakeupItem from "./MakeupItem";
import VerticalScrollVirtualList from '../utils/VerticalScrollVirtualList';
import useFetchHook from "../../custimizedHook/useFetchHook";
import { fetchEyeliner } from "./service";

function EyelinerList(props) {
  // fetch lipsticks data, and set state
  let authNeeded = <div>
    <span>Sending request to a http API is not allowed from https, so we used a little work around just for demonstration. Please grant a temp access, then <strong>refresh</strong> the page. Data will be fetched.</span>
    <iframe
      title="Please give temp auth to request data."
      width="100%"
      src="https://cors-anywhere.herokuapp.com/http://makeup-api.herokuapp.com/api/v1/products.json"
    />
  </div>;

  // fetch data
  const { data, onError } = useFetchHook(fetchEyeliner);

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
      <h3><HeartOutlined /> Eyeliner </h3>
      <VerticalScrollVirtualList list={data} itemDimensions={{width: 206, height: 390}}>
        {/* VerticalScrollVirtualList takes a function as children.
        function should take visibleItems as argument and loop the argument to return a item list*/}
        { renderChildren }
      </VerticalScrollVirtualList>
      { onError ? authNeeded : "" }
    </>
  )
}

export default EyelinerList;