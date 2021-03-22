// import from react
import React from 'react';

// import from antd
import {Layout, Menu} from 'antd'
import { DashboardOutlined, HomeOutlined, UnorderedListOutlined, UserOutlined } from "@ant-design/icons";

// import from react-router-dom
import { NavLink, withRouter } from "react-router-dom";

// import from redux
import { connect } from "react-redux";

// import from components
import LangRadio from "./LangRadio";

// import custimazied hook, get language data.
import useLanguagePageText from '../custimizedHook/LanguageHook';

function AppHeader(props) {
  const { Header } = Layout;
  const { locale } = props

  //get lang data, passing locale to dynamically load lang data based on Redux locale state.
  const pageText = useLanguagePageText(locale);

  return (
    <>
      <Header 
        className="app-header"
      >
        <Menu selectedKeys={[props.history.location.pathname]} mode="horizontal">
          {/*Route Navi*/}
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <NavLink exact to="/">{!!pageText.appHeader ? pageText.appHeader[0] : ""}</NavLink>
          </Menu.Item>
          <Menu.Item key="/dashboard" icon={<DashboardOutlined />}>
            <NavLink exact to="/dashboard">{!!pageText.appHeader ? pageText.appHeader[1] : ""}</NavLink>
          </Menu.Item>
          <Menu.Item key="/usercenter" icon={<UserOutlined />}>
            <NavLink exact to={{
              pathname: "/usercenter",
              search: "?name=sean&age=18",
              hash: "#hashtag",
              state: {fromDashboard: true, link: 'google.com', userId: 'xxjsdf834'}
            }}>
              {!!pageText.appHeader ? pageText.appHeader[2] : ""}
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/tasks" icon={<UnorderedListOutlined />}>
            <NavLink exact to="/tasks">{!!pageText.appHeader ? pageText.appHeader[3] : ""}</NavLink>
          </Menu.Item>
        </Menu>
        <div className="header-info">
          <span className="header-signup"><NavLink exact activeClassName="link-text-active" to="/register">{!!pageText.appHeader ? pageText.appHeader[4] : ""}</NavLink></span>
          <LangRadio />
        </div>
      </Header>
    </>
  )
}

// get redux state and passing it to component props
const mapStateToProps = (state) => {
  return {
    locale: state.locale
  }
}

// export List component
export default connect(mapStateToProps, null)(withRouter(AppHeader));