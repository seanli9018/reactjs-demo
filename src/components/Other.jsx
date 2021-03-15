import React from 'react';
import { NavLink, withRouter } from "react-router-dom";


class Other extends React.Component {
  handleOnClick() {
    // console.log(this.props);
    this.props.history.push("/mine/todos");
  }
  render() {
    // console.log(this.props);
    return (
      <div>
        <input type="button" value="点我跳转到个人任务页面" onClick={()=>this.handleOnClick()}/>
        <span><NavLink to="/mine/todos">点我</NavLink></span>
      </div>
    );
  }
}

export default withRouter(Other);