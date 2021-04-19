import React from 'react';

// import from antd
import { Layout, Menu } from "antd";

// import react router
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';

// import components
import MakeupNav from '../components/makeup/MakeupNav';
import LazyImage from '../components/image/LazyImage';
import LipsticksList from '../components/makeup/LipsticksList';
import NailPolishList from "../components/makeup/NailPolishList";
import MascaraList from "../components/makeup/MascaraList";
import LipLinerList from "../components/makeup/LipLinerList";
import FoundationList from "../components/makeup/FoundationList";


const { Content } = Layout;

function Makeup(props) {
  let { path, url } = useRouteMatch();

  // render
  return (
    <div>
      <h1>Makeups</h1>
      <h5>
        Data are from MakeupAPI, a free public api source. There is no backend pagination setup <br />
        Therefore, It takes a while to fetch all data at one time.<br />
        In order to enhance the performance, dynamic list items LAZY rendering is utilized.<br />
        (Only the list items within the visible screen are rendered.)
      </h5>
      <div className="image-grid">
        <div className="photo">
          <LazyImage
            src="http://makeup-api.herokuapp.com/assets/brushes-6d2ab84631ecd47ced4fa07c47eb37521eb61c5a525965dafaf308f21338aa44.png"
            alt={["Brushes"]}
          />
        </div>
        <div className="photo photo-lips">
          <LazyImage
            src="http://makeup-api.herokuapp.com/assets/lips-c35ec4a3350ec779c6bf6a785981ad9ef2e21bd9fe26a2be1c766d56edb2e11f.png"
            alt={["Lips"]}
          />
        </div>
        <div className="photo">
          <LazyImage
            src="http://makeup-api.herokuapp.com/assets/nail-polish-4c7ee1a5f7a5cbaff9757c3bcfa4f6e89d7a6f2ffc49d267e04e010ba94cfd7c.png"
            alt={["Nail", "polish"]}
          />
        </div>
        <div className="photo">
          <LazyImage
            src="http://makeup-api.herokuapp.com/assets/single-pot-4ce398e7d8c527ef248ace7a783cc52fd583375a25a7dcdb7b16f7a0958ccb17.png"
            alt={["Single", "pot"]}
          />
        </div>
        <div className="photo">
          <LazyImage
            src="http://makeup-api.herokuapp.com/assets/eyeshadow-18fa4bed267bec6a67506150d9574259d0dcc67700e69de4ba720d9afe8204a2.png"
            alt={["Eyeshadow"]}
          />
        </div>
      </div>
      <Layout className="makeup-layout-background" style={{ padding: "24px 0", maxWidth: "1200px" }}>
        {/* makeup page nav side bar component*/}
        <MakeupNav />
        {/* makeup page content component*/}
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          {/*Route View/output */}
          <Switch>
            <Route exact path={path} component={LipsticksList} />
            <Route path={`${path}/foundation`} component={FoundationList} />
            <Route path={`${path}/lipliner`} component={LipLinerList} />
            <Route exact path={`${path}/lipsticks`} component={LipsticksList} />
            <Route path={`${path}/mascara`} component={MascaraList} />
            <Route path={`${path}/nailpolish`} component={NailPolishList} />
          </Switch>
        </Content>
      </Layout>
    </div>
  )
}


// export List component
export default Makeup;