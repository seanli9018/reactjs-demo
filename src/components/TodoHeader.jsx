import React, {useState, useEffect} from 'react';

//import react-redux
import { connect } from 'react-redux';
import { addOneTask } from '../store/actionCreators';

function TodoHeader(props) {
  const [taskInput, setTaskInput] = useState('');
  const [pageText, setPageText] = useState({});
  const { locale } = props;

  useEffect(()=>{
    // after componentDidMount and componentDidUpdate, we need to get langData file and set page text
    React.$lang.languageLoader().then((langData)=>{
      setPageText(langData.default);
    })
  }, [locale])

  function handleInputChange(e) {
    setTaskInput(e.target.value);
  }

  // handle Enter key down event
  function handleKeyEvent(e) {
    // 0. initial and get all tasks data
    const { tasks } = props;

    // 1. handle key down event; dispatch input data to store state
    if(e.keyCode === 13 && !! taskInput) {
      // calculate last task's id based on store state length
      const lastItemId = tasks.length === 0 ? 1 : tasks[tasks.length - 1].id

      // organize the newly created task object
      const item = {
        id: lastItemId + 1,
        title: taskInput.trim(),
        finished: false
      }

      // dispatch new tasks and set store state
      const { dispatchAddOneTask } = props;
      dispatchAddOneTask(item);

      // clear header input, after successfully add input value
      setTaskInput('');
    }
  }

  return (
    <div className="tasks-header">
      <input className="task-input"
             type="text"
             placeholder={pageText.tasksInputPlaceholder}
             value={taskInput}
             onChange={(e) => handleInputChange(e)}
             onKeyDown={(e) => handleKeyEvent(e)}
      />
    </div>
  )
}

const mapStateToProps = (state /*, ownProps*/) => {
  // return newly matched store state to component props
  return {
    tasks: state.tasks,
    locale: state.locale
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