import React, { useState, useEffect } from 'react';
import {connect} from "react-redux";

// import language JSON
//import lang from '../languages/lang';
function UserCenter(props) {
  const query = new URLSearchParams(props.location.search);
  const [pageText, setPageText] = useState({})
  const { locale } = props


  useEffect(()=>{
    // after componentDidMount and componentDidUpdate, we need to get langData file and set page text
    React.$lang.languageLoader().then((langData)=>{
      setPageText(langData.default);
    })
  }, [locale])

  // console.log(pageText)
  console.log(query.get("name"));
  console.log(query.get("age"));
  return (
    <div>
      {pageText.usercenterTitle}
    </div>
  )
}

// get redux state and passing it to component props
const mapStateToProps = (state) => {
  return {
    locale: state.locale
  }
}

// export List component
export default connect(mapStateToProps, null)(UserCenter);