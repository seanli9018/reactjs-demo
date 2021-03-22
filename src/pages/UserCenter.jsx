import React from 'react';
import {connect} from "react-redux";

// import custimazied hook, get language data.
import useLanguagePageText from '../custimizedHook/LanguageHook';

function UserCenter(props) {
  const query = new URLSearchParams(props.location.search);
  const { locale } = props

  //get lang data, passing locale to dynamically load lang data based on Redux locale state.
  const pageText = useLanguagePageText(locale);

  console.log(query.get("name"));
  console.log(query.get("age"));
  return (
    <div>
      {!!pageText && pageText.usercenterTitle}
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