//import react
import React from 'react';

//import page components
import Todos from "./pages/Todos";
import Home from "./pages/Home";
import Mine from "./pages/Mine";
import UserCenter from "./pages/UserCenter";

//import react-router-dom
import {
  HashRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom"
class App extends React.Component {
  render() {
    return (
    <div>
      <Router>
        {/*Route Navi*/}
        <ul>
          <li><NavLink exact activeClassName="selected" to="/">首页</NavLink></li>
          <li><NavLink exact activeClassName="selected" to="/mine?name=sean&age=18">我的页面</NavLink></li>
          <li><NavLink exact activeClassName="selected" to={{
                                                              pathname: "/mine/usercenter",
                                                              search: "?name=sean&age=18",
                                                              hash: "#hashtag",
                                                              state: {fromDashboard: true, link: 'google.com', userId: 'xxjsdf834'}
                                                            }}>
            个人中心
          </NavLink></li>
          <li><NavLink exact activeClassName="selected" to="/mine/todos">个人任务</NavLink></li>
        </ul>
        {/*Route View/output */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/mine" component={Mine} />
          <Route exact path="/mine/usercenter" component={UserCenter} />
          <Route exact path="/mine/todos" component={Todos} />
        </Switch>
      </Router>
    </div>
    );
  }
}

export default App;
