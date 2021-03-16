//import react
import React from 'react';
//import antd


//import page components
import Todos from "./pages/Todos";
import Home from "./pages/Home";
import UserCenter from "./pages/UserCenter";
import Dashboard from "./pages/Dashboard";

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
          <li><NavLink exact activeClassName="selected" to="/">Home</NavLink></li>
          <li><NavLink exact activeClassName="selected" to="/dashboard">Dashboard</NavLink></li>
          <li><NavLink exact activeClassName="selected" to={{
                                                              pathname: "/usercenter",
                                                              search: "?name=sean&age=18",
                                                              hash: "#hashtag",
                                                              state: {fromDashboard: true, link: 'google.com', userId: 'xxjsdf834'}
                                                            }}>
            User Center
          </NavLink></li>
          <li><NavLink exact activeClassName="selected" to="/tasks">Tasks</NavLink></li>
        </ul>
        {/*Route View/output */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/usercenter" component={UserCenter} />
          <Route exact path="/tasks" component={Todos} />
        </Switch>
      </Router>
    </div>
    );
  }
}

export default App;
