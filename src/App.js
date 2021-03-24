//import react
import React from 'react';

//import react-router-dom
import { HashRouter as Router } from "react-router-dom"

// import from react redux
import {connect} from "react-redux";

//import antd
import { Layout } from 'antd';
import { ConfigProvider } from "antd";
import moment from 'moment';
import 'moment/locale/zh-cn';
import enUS from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_CN';

//import page components
import AppFooter from './components/AppFooter';
import AppHeader from './components/AppHeader';
import AppContent from "./components/AppContent";

moment.locale('cn');
// app file
function App(props) {
  const { locale } = props;
  console.log("Thank you for checking my code! Please contact me via email 'seanli9018@gmail.com' if you are hiring passionate web developer!!!")
  return (
    //ConfigProvider is for antdesign UI to pass language objects globally.
    <ConfigProvider locale={locale==='zh-cn' ? zhCN : enUS}> 
      <Router>
        <Layout>
          <AppHeader />
          <AppContent />
          <AppFooter />
        </Layout>
      </Router>
    </ConfigProvider>
  )
}

const mapStateToProps = (state)=>{
  return {
    locale: state.locale
  }
}

// export List component
export default connect(mapStateToProps, null)(App);
