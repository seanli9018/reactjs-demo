// import react
import React from 'react';

// import from antd
import { Layout, Menu } from "antd";

// import from react-router
import {NavLink, useRouteMatch, withRouter} from "react-router-dom";

//import custimized hook
import useLanguagePageText from "../../custimizedHook/LanguageHook";

// import component
import LazyImage from "../image/LazyImage";
import {connect} from "react-redux";

const { Sider } = Layout;

function MakeupNav (props) {
  let { path, url } = useRouteMatch();

  const { locale } = props;
  //get lang data, passing locale to dynamically load lang data based on Redux locale state.
  const pageText = useLanguagePageText(locale);

  return (
    <div className="makeup-nav-wrapper">
      <Sider className="site-layout-background" width={200}>
        <Menu
          mode="inline"
          selectedKeys={[props.history.location.pathname]}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%' }}
        >
          <Menu.Item key={`${url}/blush`}>
            <NavLink to={`${url}/blush`}>
              <LazyImage
                src="http://makeup-api.herokuapp.com/assets/blush-ff7992c3d7690d18a9b0224177cfbdedbc036497cf87c393ec01c6a2ef070258.svg"
                alt={["Blush", "product"]}
                className="makeup-nav-icon"
              />
              {pageText.makeupsNav ? pageText.makeupsNav[0] : ""}
            </NavLink>
          </Menu.Item>
          <Menu.Item key={`${url}/bronzer`}>
            <NavLink to={`${url}/bronzer`}>
              <LazyImage
                src="http://makeup-api.herokuapp.com/assets/bronzer-2d423487eea3e4571229bd95689bb4eb4331f05740f3921ede7c7c765c7954b1.svg"
                alt={["Bronzer", "product"]}
                className="makeup-nav-icon"
              />
              {pageText.makeupsNav ? pageText.makeupsNav[1] : ""}
            </NavLink>
          </Menu.Item>
          <Menu.Item key={`${url}/eyebrow`}>
            <NavLink to={`${url}/eyebrow`}>
              <LazyImage
                src="http://makeup-api.herokuapp.com/assets/eyebrow-fc49d8d480ace717203a21fe863c2231970063add91ed2f15181fe8e2d3b96b9.svg"
                alt={["Eyebrow", "product"]}
                className="makeup-nav-icon"
              />
              {pageText.makeupsNav ? pageText.makeupsNav[2] : ""}
            </NavLink>
          </Menu.Item>
          <Menu.Item key={`${url}/eyeliner`}>
            <NavLink to={`${url}/eyeliner`}>
              <LazyImage
                src="http://makeup-api.herokuapp.com/assets/eyeliner-de329b6d65d721a45190051af1153e23202df9eb1c393d1ac65972376ee42d50.svg"
                alt={["Eyeliner", "product"]}
                className="makeup-nav-icon"
              />
              {pageText.makeupsNav ? pageText.makeupsNav[3] : ""}
            </NavLink>
          </Menu.Item>
          <Menu.Item key={`${url}/eyeshadow`}>
            <NavLink to={`${url}/eyeshadow`}>
              <LazyImage
                src="http://makeup-api.herokuapp.com/assets/eyeshadow-67f9f8fd19df1862c95122f9b3460c7e6674d5a6d178cde00e6e4be908dd898a.svg"
                alt={["Eyeshadow", "product"]}
                className="makeup-nav-icon"
              />
              {pageText.makeupsNav ? pageText.makeupsNav[4] : ""}
            </NavLink>
          </Menu.Item>
          <Menu.Item key={`${url}/foundation`}>
            <NavLink to={`${url}/foundation`}>
              <LazyImage
                src="http://makeup-api.herokuapp.com/assets/foundation-9985c8a404d4a19cf7a2985ed504958cadd9f71252a73c90b6a7178bf7075143.svg"
                alt={["Foundation", "product"]}
                className="makeup-nav-icon"
              />
              {pageText.makeupsNav ? pageText.makeupsNav[5] : ""}
            </NavLink>
          </Menu.Item>
          <Menu.Item key={`${url}/lipliner`}>
            <NavLink to={`${url}/lipliner`}>
              <LazyImage
                src="http://makeup-api.herokuapp.com/assets/lip_liner-3f40bb63957aa7d47e3a2d1356b9380aa093271e5d58f3518181fd427e388d93.svg"
                alt={["Lip", "Liner", "product"]}
                className="makeup-nav-icon"
              />
              {pageText.makeupsNav ? pageText.makeupsNav[6] : ""}
            </NavLink>
          </Menu.Item>
          <Menu.Item key={props.history.location.pathname === url ? url : `${url}/lipsticks`}>
            <NavLink to={`${url}/lipsticks`}>
              <LazyImage
                src="http://makeup-api.herokuapp.com/assets/lipstick-4531b48ee71839393857e24c8cbc4dede1f99d2284ef82a6eb0a2a4d03540a14.svg"
                alt={["Lipstick", "product"]}
                className="makeup-nav-icon"
              />
              {pageText.makeupsNav ? pageText.makeupsNav[7] : ""}
            </NavLink>
          </Menu.Item>
          <Menu.Item key={`${url}/mascara`}>
            <NavLink to={`${url}/mascara`}>
              <LazyImage
                src="http://makeup-api.herokuapp.com/assets/mascara-0deeeb81e58f31ddbff07847bfd0820e5ecdba1419f4281da743a05e0d6b3e69.svg"
                alt={["Mascara", "product"]}
                className="makeup-nav-icon"
              />
              {pageText.makeupsNav ? pageText.makeupsNav[8] : ""}
            </NavLink>
          </Menu.Item>
          <Menu.Item key={`${url}/nailpolish`}>
            <NavLink to={`${url}/nailpolish`}>
              <LazyImage
                src="http://makeup-api.herokuapp.com/assets/nail_polish-a7e7204834c0c30e8b57a1ba9896656331e228b0daa09d1705d1ab29bc0b7151.svg"
                alt={["Nail", "Polish", "product"]}
                className="makeup-nav-icon"
              />
              {pageText.makeupsNav ? pageText.makeupsNav[9] : ""}
            </NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  )
}

// get redux state and passing it to component props
const mapStateToProps = (state) => {
  return {
    locale: state.locale
  }
}

// export List component
export default connect(mapStateToProps, null)(withRouter(MakeupNav));