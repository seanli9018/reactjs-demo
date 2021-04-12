// import react
import React from 'react';

// import from antd
import { Layout, Menu } from "antd";
// import from react-router
import {NavLink, useRouteMatch} from "react-router-dom";
// import component
import LazyImage from "../image/LazyImage";



const { Sider } = Layout;

function MakeupNav (props) {
  let { path, url } = useRouteMatch();
  return (
    <div className="makeup-nav-wrapper">
      <Sider className="site-layout-background" width={200}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%' }}
        >
          <Menu.Item key="Blush">
            <LazyImage
              src="http://makeup-api.herokuapp.com/assets/blush-ff7992c3d7690d18a9b0224177cfbdedbc036497cf87c393ec01c6a2ef070258.svg"
              alt={["Blush", "product"]}
              className="makeup-nav-icon"
            />
            Blush
          </Menu.Item>
          <Menu.Item key="Bronzer">
            <LazyImage
              src="http://makeup-api.herokuapp.com/assets/bronzer-2d423487eea3e4571229bd95689bb4eb4331f05740f3921ede7c7c765c7954b1.svg"
              alt={["Bronzer", "product"]}
              className="makeup-nav-icon"
            />
            Bronzer
          </Menu.Item>
          <Menu.Item key="Eyebrow">
            <LazyImage
              src="http://makeup-api.herokuapp.com/assets/eyebrow-fc49d8d480ace717203a21fe863c2231970063add91ed2f15181fe8e2d3b96b9.svg"
              alt={["Eyebrow", "product"]}
              className="makeup-nav-icon"
            />
            Eyebrow
          </Menu.Item>
          <Menu.Item key="Eyeliner">
            <LazyImage
              src="http://makeup-api.herokuapp.com/assets/eyeliner-de329b6d65d721a45190051af1153e23202df9eb1c393d1ac65972376ee42d50.svg"
              alt={["Eyeliner", "product"]}
              className="makeup-nav-icon"
            />
            Eyeliner
          </Menu.Item>
          <Menu.Item key="Eyeshadow">
            <LazyImage
              src="http://makeup-api.herokuapp.com/assets/eyeshadow-67f9f8fd19df1862c95122f9b3460c7e6674d5a6d178cde00e6e4be908dd898a.svg"
              alt={["Eyeshadow", "product"]}
              className="makeup-nav-icon"
            />
            Eyeshadow
          </Menu.Item>
          <Menu.Item key="Foundation">
            <LazyImage
              src="http://makeup-api.herokuapp.com/assets/foundation-9985c8a404d4a19cf7a2985ed504958cadd9f71252a73c90b6a7178bf7075143.svg"
              alt={["Foundation", "product"]}
              className="makeup-nav-icon"
            />
            Foundation
          </Menu.Item>
          <Menu.Item key="Lip Liner">
            <LazyImage
              src="http://makeup-api.herokuapp.com/assets/lip_liner-3f40bb63957aa7d47e3a2d1356b9380aa093271e5d58f3518181fd427e388d93.svg"
              alt={["Lip", "Liner", "product"]}
              className="makeup-nav-icon"
            />
            Lip Liner
          </Menu.Item>
          <Menu.Item key="Lipstick">
            <NavLink to={`${url}/lipsticks`}>
              <LazyImage
                src="http://makeup-api.herokuapp.com/assets/lipstick-4531b48ee71839393857e24c8cbc4dede1f99d2284ef82a6eb0a2a4d03540a14.svg"
                alt={["Lipstick", "product"]}
                className="makeup-nav-icon"
              />
              Lipstick
            </NavLink>
          </Menu.Item>
          <Menu.Item key="Mascara">
            <LazyImage
              src="http://makeup-api.herokuapp.com/assets/mascara-0deeeb81e58f31ddbff07847bfd0820e5ecdba1419f4281da743a05e0d6b3e69.svg"
              alt={["Mascara", "product"]}
              className="makeup-nav-icon"
            />
            Mascara
          </Menu.Item>
          <Menu.Item key="Nail Polish">
            <LazyImage
              src="http://makeup-api.herokuapp.com/assets/nail_polish-a7e7204834c0c30e8b57a1ba9896656331e228b0daa09d1705d1ab29bc0b7151.svg"
              alt={["Nail", "Polish", "product"]}
              className="makeup-nav-icon"
            />
            Nail Polish
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  )
}

export default MakeupNav;