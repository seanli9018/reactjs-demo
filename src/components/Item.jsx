// React imports
import React, { useState } from 'react';
import PropTypes from 'prop-types'

// react-redux imports
import { connect } from 'react-redux';
import {changeOneFinished, delOneTask} from "../store/actionCreators";

// components imports
import Button from './button/Button';

// import custimazied hook, get language data.
import useLanguagePageText from '../custimizedHook/LanguageHook';

function Item(props) {
  const [showBtns, setShowBtns] = useState(false);
  const [showUpBtns, setShowUpBtns] = useState(false);
  const [showDownBtns, setShowDownBtns] = useState(false);
  const { locale } = props;
  //get lang data, passing locale to dynamically load lang data based on Redux locale state.
  const pageText = useLanguagePageText(locale);

  //flag is a boolean, flag = onMouseOver ? true : false
  function handleShowDelBtn(flag) {
    setShowBtns(flag);
  }

  //if index !== 0, then show up btn
  function handleUpBtns(index) {
    if(index !== 0 ){
      setShowUpBtns(true);
    }else{
      setShowUpBtns(false);
    }
  }

  //if index !== last index, then show down btn
  function handleDownBtns(index) {
    if(index !== tasks.length-1){
      setShowDownBtns(true);
    }else{
      setShowDownBtns(false);
    }
  }
 

  function handleShowBtn(flag, index){
    // Mouse hover ? show : hide
    handleShowDelBtn(flag);
    
    // control Up btn and down btn show/hide
    if(index !== undefined){
      handleUpBtns(index);
      handleDownBtns(index);
    }
  }

  // finished ? dispatch delete task : prompt confirm modal
  function handleItemDelete(itemId, finshedStatus){
    const { dispatchDelOneTask } = props;
    if(finshedStatus){
      dispatchDelOneTask(itemId);
    }else{
      // prompt Confirm modal
      React.$modal.confirm(()=>{ // Ok clicked
        dispatchDelOneTask(itemId);
      }, ()=>{ // Cancel clicked
        console.log("Clicked Cancel");
      }, "Do you really want to delete unfinished task?")
    }
  }

  const { item, itemIndex, dispatchChangeTaskFinished, handleMoveEvent, tasks } = props;

  return (
    <li className="task-item"
        onMouseOver={() => handleShowBtn(true, itemIndex)}
        onMouseOut={() => handleShowBtn(false)}
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
          value={!!pageText.tasksBtns?pageText.tasksBtns[0]:""}
          showBtn={showBtns && showUpBtns}
          onClickFunction={() => handleMoveEvent(itemIndex, -1)}
        />
        <Button
          value={!!pageText.tasksBtns?pageText.tasksBtns[1]:""}
          showBtn={showBtns && showDownBtns}
          onClickFunction={() => handleMoveEvent(itemIndex, 1)}
        />
        <Button
          value={!!pageText.tasksBtns?pageText.tasksBtns[2]:""}
          showBtn={showBtns}
          btnClass="delete-btn"
          onClickFunction={() => handleItemDelete(item.id, item.finished)}
        />
      </div>
    </li>
  )
}
Item.propTypes = {
  item: PropTypes.object.isRequired,
  handleMoveEvent: PropTypes.func.isRequired,
  itemIndex: PropTypes.number.isRequired
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    locale: state.locale
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