import React, {Component} from 'react';

//import react-redux
import { connect } from 'react-redux';
import { addOneTask } from '../store/actionCreators';

class TodoHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskInput: ''
    }
  }

  handleInputChange(e) {
    this.setState({
      taskInput: e.target.value
    })
  }

  // handle Enter key down event
  handleKeyEvent(e) {
    // 0. initial and get all tasks data
    const { tasks } = this.props;

    // 1. handle key down event; dispatch input data to store state
    if(e.keyCode === 13 && !!this.state.taskInput) {
      // calculate last task's id based on store state length
      const lastItemId = tasks.length === 0 ? 1 : tasks[tasks.length - 1].id

      // organize the newly created task object
      const item = {
        id: lastItemId + 1,
        title: this.state.taskInput.trim(),
        finished: false
      }

      // dispatch new tasks and set store state
      this.props.dispatchAddOneTask(item);

      // clear header input, after successfully add input value
      this.setState({
        taskInput: ''
      })
    }
  }

  render() {
    const {taskInput} = this.state;

    return (
      <div className="tasks-header">
        <input className="task-input"
               type="text"
               placeholder="Input the task you need to accomplish, then press enter key!"
               value={taskInput}
               onChange={(e) => this.handleInputChange(e)}
               onKeyDown={(e) => this.handleKeyEvent(e)}
        />
      </div>
    )
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  // return newly matched store state to component props
  return {
    tasks: state.tasks
  }
}

const mapDispatchToProps = (dispatch) => {
  // return newly matched store dispatch to component props
  return {
    dispatchAddOneTask(task) {
      // get action object
      const action = addOneTask(task);
      // dispatch to reducer to update store state
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoHeader)