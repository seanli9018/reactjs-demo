// import from react
import React from 'react';

// import from antd
import {Layout, Menu} from 'antd'
import { DashboardOutlined, HomeOutlined, UnorderedListOutlined, UserOutlined, HeartOutlined } from "@ant-design/icons";

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

  // handle log out btn click event
  function handleLogOut() {
    // clear user auth
    React.$auth.clearUserAuth();
    // redirect to log in page
    props.history.replace('/');
    // show logout successfully modal
    let logoutMsg = pageText.loginLogoutMsg ? pageText.loginLogoutMsg[1] : "";
    React.$notice.success(logoutMsg, '', 6);
  }

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
              state: {fromDashboard: true, link: 'google.com', userId: React.$auth.email ? React.$auth.email.replace(/@[\s\S]+/, "") : ""}
            }}>
              {!!pageText.appHeader ? pageText.appHeader[2] : ""}
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/tasks" icon={<UnorderedListOutlined />}>
            <NavLink exact to="/tasks">{!!pageText.appHeader ? pageText.appHeader[3] : ""}</NavLink>
          </Menu.Item>
          <Menu.Item key="/makeups" icon={<HeartOutlined />}>
            <NavLink to="/makeups">{!!pageText.appHeader ? pageText.appHeader[4] : ""}</NavLink>
          </Menu.Item>
        </Menu>
        <div className="header-info">
          {/*if authenticated, show username, else show signup/login btn*/}
          { React.$auth.is_authenticated ?
            <span className="header-signup">
              <NavLink
                exact
                activeClassName="link-text-active"
                to="/usercenter">
                {React.$auth.email.replace(/@[\s\S]+/, '')}
              </NavLink>
              <span className="header-logout" onClick={() => handleLogOut()}>Log out</span>
            </span> :
            <span className="header-signup">
              <NavLink
                exact
                activeClassName="link-text-active"
                to="/register">
                {!!pageText.appHeader ? pageText.appHeader[5] : ""}
              </NavLink>
            </span>
          }
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