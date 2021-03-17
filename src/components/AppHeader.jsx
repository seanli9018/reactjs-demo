// import from react
import React, {useState} from 'react';

// import from antd
import {Layout, Menu} from 'antd'
import {DashboardOutlined, HomeOutlined, UnorderedListOutlined, UserOutlined} from "@ant-design/icons";

// import from react-router-dom
import {NavLink} from "react-router-dom";

// import from components
import LangRadio from "./LangRadio";

function AppHeader() {
  const [current, setCurrent] = useState('home')
  const { Header } = Layout;
  let handleClick = e => {
    setCurrent(e.key);
  };
  return (
    <>
      <Header className="app-header">
        <Menu onClick={handleClick} selectedKeys="selected" mode="horizontal">
          {/*Route Navi*/}
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <NavLink exact activeClassName="selected" to="/">Home</NavLink>
          </Menu.Item>
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            <NavLink exact activeClassName="selected" to="/dashboard">Dashboard</NavLink>
          </Menu.Item>
          <Menu.Item key="usercenter" icon={<UserOutlined />}>
            <NavLink exact activeClassName="selected" to={{
              pathname: "/usercenter",
              search: "?name=sean&age=18",
              hash: "#hashtag",
              state: {fromDashboard: true, link: 'google.com', userId: 'xxjsdf834'}
            }}>
              User Center
            </NavLink>
          </Menu.Item>
          <Menu.Item key="tasks" icon={<UnorderedListOutlined />}>
            <NavLink exact activeClassName="selected" to="/tasks">Tasks</NavLink>
          </Menu.Item>
        </Menu>
        <LangRadio />
      </Header>
    </>
  )
}
export default AppHeader;