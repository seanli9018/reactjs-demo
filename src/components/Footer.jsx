import React, {Component} from 'react';

// react-redux imports
import { connect } from 'react-redux';
import {isAllFinished, delFinishedTasks} from "../store/actionCreators";

class Footer extends Component {
  // calculate the count of finished tasks
  _calculateFinishedTasks(tasks) {
    let finishedTaskCount = 0;

    tasks.forEach((task) => {
      if (task.finished === true) {
        finishedTaskCount += 1;
      }
    })
    return finishedTaskCount
  }

  render() {
    const {items, dispatchIsAllFinished, dispatchDelFinishedTasks} = this.props;
    const finishedItems = this._calculateFinishedTasks(items);
    const totalItems = items.length;
    return (
      <div className="app-footer">
        <label htmlFor="footer-checkbox">
          <input
            type="checkbox"
            id="footer-checkbox"
            checked={finishedItems === totalItems && totalItems > 0}
            onChange={() => dispatchIsAllFinished(finishedItems !== totalItems)} // if it is not all-selected, then flag === true
          />
          <span className="task-info">已完成{finishedItems}件 / 总计{totalItems}件</span>
        </label>
        <input type="button" className="task-btn" value="清除已完成任务" onClick={() => dispatchDelFinishedTasks()}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.tasks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchDelFinishedTasks() {
      // get action object ready
      const action = delFinishedTasks();
      dispatch(action);
    },
    dispatchIsAllFinished(flag) {
      // get action object ready
      const action = isAllFinished(flag);
      dispatch(action);
    }
  }
}

// export Item component
export default connect(mapStateToProps, mapDispatchToProps)(Footer);