// React imports
import React, {Component} from 'react';
import PropTypes from 'prop-types'

// react-redux imports
import { connect } from 'react-redux';
import {changeOneFinished, delOneTask} from "../store/actionCreators";

// components imports
import Button from './Button';

class Item extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      showBtns: false
    }
  }

  //flag is a boolean, flag = onMouseOver ? true : false
  handleShowBtn(flag) {
    this.setState({
      showBtns: flag
    })
  }

  render() {
    const {item, dispatchChangeTaskFinished, dispatchDelOneTask} = this.props;
    const {showBtns} = this.state;
    return (
      <li className="task-item"
          // onFocus={() => this.handleShowBtn(true)}
          // onBlur={() => this.handleShowBtn(false)}
          onMouseOver={() => this.handleShowBtn(true)}
          onMouseOut={() => this.handleShowBtn(false)}
      >
        <label htmlFor={"item-check-box"+item.id}>
          <input
            className="item-check-box"
            type="checkbox"
            name="item-check-box"
            id={"item-check-box"+item.id}
            checked={item.finished}
            onChange={() => dispatchChangeTaskFinished(item.id, !item.finished)}/>
          <span>{item.title}</span>
        </label>
        <div className="button-group">
          <Button
            value="Up"
            showBtn={showBtns}
            onClickFunction={() => alert("Clicked")}
          />
          <Button
            value="Down"
            showBtn={showBtns}
            onClickFunction={() => alert("Clicked")}
          />
          <Button
            value="Delete"
            showBtn={showBtns}
            btnClass="delete-btn"
            onClickFunction={() => dispatchDelOneTask(item.id)}
          />
        </div>
      </li>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    tasks: state.tasks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchDelOneTask(taskId) {
      // get action object ready
      const action = delOneTask(taskId);
      dispatch(action);
    },
    dispatchChangeTaskFinished(taskId, finishedStatus) {
      // get action object ready
      const action = changeOneFinished(taskId, finishedStatus);
      dispatch(action);
    }
  }
}

// export Item component
export default connect(mapStateToProps, mapDispatchToProps)(Item);