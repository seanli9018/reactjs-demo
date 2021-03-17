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

//import page components
import AppFooter from './components/AppFooter';
import AppHeader from './components/AppHeader';
import AppContent from "./components/AppContent";

moment.locale('cn');

function App(props) {
  const { locale } = props;
  return (
    <ConfigProvider locale={locale}>
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
