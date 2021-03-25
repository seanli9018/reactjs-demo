import React from 'react';
import {connect} from "react-redux";

// import custimazied hook, get language data.
import useLanguagePageText from '../custimizedHook/LanguageHook';

function UserCenter(props) {
  //const query = new URLSearchParams(props.location.search);
  //const userId = props.location.state ? props.location.state.userId : '';

  const { locale } = props

  //get lang data, passing locale to dynamically load lang data based on Redux locale state.
  const pageText = useLanguagePageText(locale);

  return (
    <div>
      <h1>{!!pageText.usercenterTitle && pageText.usercenterTitle[0]}</h1>
      {
        !!React.$auth.is_authenticated &&
        <span>{!!pageText.usercenterTitle && pageText.usercenterTitle[1] + React.$auth.email.replace(/@[\s\S]+/, "")}</span>
      }
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