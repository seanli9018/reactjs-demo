//import react
import React, {useEffect} from 'react';

//import react-router-dom
import { HashRouter as Router } from "react-router-dom"

// import from react redux
import {connect} from "react-redux";

//import antd
import { Layout, ConfigProvider, Spin } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import enUS from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_CN';
import { SmileOutlined } from '@ant-design/icons';

//import page components
import AppFooter from './components/AppFooter';
import AppHeader from './components/AppHeader';
import AppContent from "./components/AppContent";

moment.locale('cn');

// app file
function App(props) {
  const { locale, loading } = props;
  console.log("Thank you for checking my code! Please contact me via email 'seanli9018@gmail.com' if you are hiring passionate web developer!!!")

  const antIcon = <SmileOutlined style={{ fontSize: 30 }} spin />;

  // if loading is true, we prevent scrolling;
  useEffect(() => {
    if(loading) {
      document.body.style.overflowY = "hidden"
    } else {
      document.body.style.overflowY = "auto"
    }
  }, [loading])

  return (
    <Spin spinning={props.loading} wrapperClassName="global-loading" indicator={antIcon} tip="Working hard to get things you want!" size="large">
      {/*ConfigProvider is for antdesign UI to pass language objects globally.*/}
      <ConfigProvider locale={locale==='zh-cn' ? zhCN : enUS}>
        <Router>
          <Layout>
            <AppHeader />
            <AppContent />
            <AppFooter />
          </Layout>
        </Router>
      </ConfigProvider>
    </Spin>
  )
}

const mapStateToProps = (state)=>{
  return {
    locale: state.locale,
    loading: state.loading
  }
}

// export List component
export default connect(mapStateToProps, null)(App);
