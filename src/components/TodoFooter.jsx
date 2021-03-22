import React from 'react';

// react-redux imports
import { connect } from 'react-redux';
import {isAllFinished, delFinishedTasks} from "../store/actionCreators";

// import component
import Button from './Button';

// import custimazied hook, get language data.
import useLanguagePageText from '../custimizedHook/LanguageHook';

function TodoFooter (props) {
  const { locale } = props;
  
  //get lang data, passing "locale" to dynamically load lang data based on Redux locale state.
  const pageText = useLanguagePageText(locale);

  // calculate the count of finished tasks
  function _calculateFinishedTasks(tasks) {
    let finishedTaskCount = 0;

    tasks.forEach((task) => {
      if (task.finished === true) {
        finishedTaskCount += 1;
      }
    })
    return finishedTaskCount
  }

  const {items, dispatchIsAllFinished, dispatchDelFinishedTasks} = props;
  const finishedItems = _calculateFinishedTasks(items);
  const totalItems = items.length;

  return (
    <div className="tasks-footer">
      <div className="tasks-footer-info">
        <label htmlFor="footer-checkbox"></label>
        <input
          type="checkbox"
          id="footer-checkbox"
          checked={finishedItems === totalItems && totalItems > 0}
          onChange={() => dispatchIsAllFinished(finishedItems !== totalItems)} // if it is not all-selected, then flag === true
        />
        {
          !!pageText.tasksFooter && //if pageText.tasksFooter is Not undefined, then we render, otherwise it will thorw a error
          <span className="task-info">
            {pageText.tasksFooter[0]} {finishedItems} {finishedItems===1?pageText.tasksFooter[1]:pageText.tasksFooter[2]} / {finishedItems===1?pageText.tasksFooter[3]:pageText.tasksFooter[4]} {totalItems}
          </span>
        }
      </div>
      {/* <input type="button" className="btn" value={!!pageText && pageText.tasksFooterBtn} onClick={() => dispatchDelFinishedTasks()} /> */}
      <Button showBtn={true} value={pageText.tasksFooterBtn || ''} onClickFunction={() => dispatchDelFinishedTasks()}/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    items: state.tasks,
    locale: state.locale
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
export default connect(mapStateToProps, mapDispatchToProps)(TodoFooter);