import React from 'react';

// import components
import Item from './Item';

// react-redux imports
import { connect } from 'react-redux';
import { moveTask } from "../store/actionCreators";


// List component
function List(props) {
  // get tasks from props;
  const { tasks, dispatchSortItem } = props;
  return (
    <ul className="task-list">
        {tasks.map((task, index) => (
          <Item item={task} itemIndex={index} key={task.id} handleMoveEvent={(index, diff) => dispatchSortItem(index, diff)}/>
        ))}
    </ul>
  )
}

// get redux state and passing it to component props
const mapStateToProps = (state) => {
  return {
    tasks: state.tasks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSortItem(index, diff){
      const action = moveTask(index, diff);
      dispatch(action);
    }
  }
}

// export List component
export default connect(mapStateToProps, mapDispatchToProps)(List);