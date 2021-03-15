import React, {Component} from 'react';
import Item from './Item';

// react-redux imports
import { connect } from 'react-redux';

class List extends Component {
  render() {
    // get tasks from props;
    const { tasks } = this.props;
    return (
      <ul className="task-list">
        {
          tasks.map((task) => (
            <Item item={task} key={task.id}/>
          ))
        }
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks
  }
}

// export List component
export default connect(mapStateToProps, null)(List);