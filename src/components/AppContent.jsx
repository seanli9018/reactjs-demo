import React from 'react';
import { Layout } from 'antd'
import { Route, Switch } from 'react-router-dom';


import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import UserCenter from '../pages/UserCenter';
import Todos from '../pages/Todos';
import Register from '../pages/Register';
import Movies from '../pages/Movies';

function AppContent() {
  const { Content } = Layout;
  return (
    <>
      <Content className="app-content">
        {/*Route View/output */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/usercenter" component={UserCenter} />
          <Route exact path="/tasks" component={Todos} />
          <Route exact path="/movies" component={Movies} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </Content>
    </>
  )
}
export default AppContent;