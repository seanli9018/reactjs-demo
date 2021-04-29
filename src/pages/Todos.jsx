import React from 'react';

// Import components
import List from '../components/todo/List';
import Header from '../components/todo/TodoHeader';
import Footer from '../components/todo/TodoFooter';
import '../index.scss';

// Import redux and react-redux
import { connect } from 'react-redux';
import {addAllTasks} from '../components/todo/store/taskActionCreators';

class Todos extends React.Component {
  // Did Mount, get data
  componentDidMount() {
    const data = {
      status: 200,
      tasks: [
        {id: 1, title: "Learn react for 2 hours", finished: false},
        {id: 2, title: "Learn node for 2 hours", finished: true},
        {id: 3, title: "Learn vue js for 2 hours", finished: false},
        {id: 4, title: "Play xbox one for 1 hour", finished: false}
      ]
    }

    //dispatch data to store
    this.props.dispatchData(data);
  }

  render() {
    return (
      <div className='tasks-wrapper'>
        <div className='tasks-container'>
          {/*Header Part - Task Input Box*/}
          <Header />

          {/*List Part - Task List*/}
          <List />
          {/*Below also works in the create-react-app, you don't have to use arrow func or bind this*/}
          {/*<List tasksArr={tasks} handleCheckBoxChange={this.handleTasksFinish}/>*/}

          {/*Footer Part - Task Control and Delete Btn*/}
          <Footer />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // return newly matched store dispatch to component props
    dispatchData(data){
      // get action
      let action = addAllTasks(data.tasks);
      // dispatch action to reducer to save data as new state
      dispatch(action);
    }
  }
}

// export default App;
export default connect(null, mapDispatchToProps)(Todos);
