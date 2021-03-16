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
    item: PropTypes.object.isRequired,
    handleMoveEvent: PropTypes.func.isRequired,
    itemIndex: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      showBtns: false,
      showUpBtns: false,
      showDownBtns: false
    }
  }

  //flag is a boolean, flag = onMouseOver ? true : false
  handleShowDelBtn(flag) {
    this.setState({
      showBtns: flag
    })
  }

  //if index !== 0, then show up btn
  handleUpBtns(index) {
    if(index !== 0 ){
      this.setState({
        showUpBtns: true
      })
    }else{
      this.setState({
        showUpBtns: false
      })
    }
  }

  //if index !== last index, then show down btn
  handleDownBtns(index) {
    if(index !== this.props.tasks.length-1){
      this.setState({
        showDownBtns: true
      })
    }else{
      this.setState({
        showDownBtns: false
      })
    }
  }

  handleShowBtn(flag, index){
    this.handleShowDelBtn(flag);
    if(index !== undefined){
      this.handleUpBtns(index);
      this.handleDownBtns(index);
    }
  }

  render() {
    const {item, itemIndex, dispatchChangeTaskFinished, dispatchDelOneTask, handleMoveEvent} = this.props;
    const {showBtns, showUpBtns, showDownBtns} = this.state;
    return (
      <li className="task-item"
          // onFocus={() => this.handleShowBtn(true)}
          // onBlur={() => this.handleShowBtn(false)}
          onMouseOver={() => this.handleShowBtn(true, itemIndex)}
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
            showBtn={showBtns && showUpBtns}
            onClickFunction={() => handleMoveEvent(itemIndex, -1)}
          />
          <Button
            value="Down"
            showBtn={showBtns && showDownBtns}
            onClickFunction={() => handleMoveEvent(itemIndex, 1)}
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