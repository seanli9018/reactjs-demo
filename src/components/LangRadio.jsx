import React from 'react';

//import from antd
import {  Radio } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from "moment";
import {connect} from "react-redux";
import { changeLocale } from "../store/actionCreators";


function LangRadio(props) {
  const { locale, dispatchChangeLocale } = props;

  let handleLocale = e => {
    // get radio user selected value
    const localeValue = e.target.value;

    // set store locale state
    dispatchChangeLocale(localeValue);

    if (!localeValue) {
      moment.locale('en');
    } else {
      moment.locale('zh-cn');
    }
  };

  return (
    <>
      <div className="change-locale">
        <Radio.Group value={!!locale ? locale : enUS} onChange={handleLocale}>
          <Radio.Button key="en" value={enUS}>
            English
          </Radio.Button>
          <Radio.Button key="cn" value={zhCN}>
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