import React from 'react';

//import from antd
import { DatePicker } from "antd";
// import { ConfigProvider } from "antd";
// import moment from 'moment';
// import 'moment/locale/zh-cn';
import {connect} from "react-redux";
// moment.locale('cn');

 function Home() {
  return (
    <div>
      <DatePicker />
    </div>
  );
}
const mapStateToProps = (state)=>{
   return {
     locale: state.locale
   }
}

// export List component
export default connect(mapStateToProps, null)(Home);