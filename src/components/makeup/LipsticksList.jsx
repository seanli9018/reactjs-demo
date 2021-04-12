// import react
import React, {useState, useEffect} from 'react';

// import antd icon
import {HeartOutlined} from "@ant-design/icons";

// import components
import MakeupItem from "./MakeupItem";

function LipsticksList(props) {
  // init lipsticks state
  const [lipsticks, setLipsticks] = useState([])

  // fetch lipsticks data, and set state
  useEffect(() => {
    React.$http.getLipSticks().then(res => {
      let lipsticksShortData = res.data.slice(0, 11);
      setLipsticks(lipsticksShortData);
    }).catch(err => {
      console.log(err)
    })
  }, [])

  // prepare lipsticks elements
  const lipsticksElement = lipsticks && lipsticks.map(lipstickItem => {
    return <MakeupItem key={lipstickItem.id} makeupItem={lipstickItem} />
  })

  // prepare blank item
  const windowWidth = window.innerWidth;
  let iElement = [];
  const iElementLength =  Math.floor(windowWidth / 206);
  for(let i=0; i<iElementLength; i++) {
    iElement.push(<i key={i}></i>)
  }
  return (
    <div className="makeup-wrapper">
      <h3><HeartOutlined /> Lipsticks </h3>
      <ul className="makeup-list">
        {lipsticksElement}
        {/* for filling the gap of flex */}
        {iElement}
      </ul>
    </div>
  )
}

export default LipsticksList;