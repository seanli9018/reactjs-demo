import React from 'react';

//import from antd
import {  Radio } from 'antd';

import moment from "moment";
import {connect} from "react-redux";
import { changeLocale } from "../store/actionCreators";


function LangRadio(props) {
  const { dispatchChangeLocale } = props;

  let handleLocale = e => {
    let localeValue = {};
    let selectedLocaleValue = e.target.value;

    // set store locale state
    dispatchChangeLocale(selectedLocaleValue);

    // set localStorage APP_LANG
    React.$lang.setLang(selectedLocaleValue);

    if (!localeValue) {
      moment.locale('en');
    } else {
      moment.locale('zh-cn');
    }
  };

  return (
    <>
      <div className="change-locale">
        <Radio.Group value={!!React.$lang.userLanguage ? React.$lang.userLanguage : 'en'} onChange={handleLocale}>
          <Radio.Button key="en" value='en'>
            English
          </Radio.Button>
          <Radio.Button key="cn" value='zh-cn'>
            中文
          </Radio.Button>
        </Radio.Group>
      </div>
    </>
  )
}

// get redux state and passing it to component props
const mapStateToProps = (state) => {
  return {
    locale: state.locale
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchChangeLocale(localValue){
      const action = changeLocale(localValue);
      dispatch(action);
    }
  }
}

// export List component
export default connect(mapStateToProps, mapDispatchToProps)(LangRadio);