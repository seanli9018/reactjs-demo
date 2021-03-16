// 1. import actionTypes
import {
  ADD_ALL_TASKS,
  ADD_ONE_TASK,
  DEL_ONE_TASK,
  CHANGE_ONE_FINISHED,
  IS_ALL_FINISHED,
  DEL_FINISHED_TASKS,
  MOVE_TASK
} from "./actionTypes";

// 2. reducer: create default state
const defaultState = {
  tasks: []
}

// 3. reducer: core methods based on action type
export default function taskReducer(state=defaultState, action){
  // 1.0 get all existing tasks from database
  if(action.type === ADD_ALL_TASKS) {
    // 1.1 clone current state
    const newState = JSON.parse(JSON.stringify(state));
    // 1.2 passing actions data to the newState
    newState.tasks = action.tasks;
    return newState;
  }
  //2.add a new task
  if(action.type === ADD_ONE_TASK) {
    //2.0 clone current state
    const newState = JSON.parse(JSON.stringify(state));
    const tasks = newState.tasks;
    const task = action.task
    //2.1 push actions task data to the newState
    tasks.push(task);
    //2.2 set new state
    return newState;
  }
  //3.delete one task
  if(action.type === DEL_ONE_TASK) {
    //3.0. clone current state
    const newState = JSON.parse(JSON.stringify(state));
    const taskId = action.taskId;
    const tasks = newState.tasks;
    //3.1. use map loop, match task ID and return a new tempTasks array
    tasks.forEach((task, index) => {
      if(task.id === taskId) {
        tasks.splice(index, 1);
      }
    })
    //3.2. Assign new tasks array to newState
    newState.tasks = tasks;
    return newState;
  }
  //4.change one task's finished status
  if(action.type === CHANGE_ONE_FINISHED) {
    //4.0 clone current state
    const newState = JSON.parse(JSON.stringify(state));
    const tasks = newState.tasks;
    const taskId = action.taskId;
    const finishedStatus = action.finishedStatus;

    //4.1. use loop match the task item and change it's finished status
    tasks.forEach((task) => {
      if(task.id === taskId) {
        task.finished = finishedStatus;
      }
    })

    //4.2. Assign new tempTasks array to new state
    newState.tasks = tasks;
    return newState;
  }
  //5.change all tasks finished status (select all and de-select all)
  if(action.type === IS_ALL_FINISHED) {
    //5.0 clone current state
    const newState = JSON.parse(JSON.stringify(state));
    const tasks = newState.tasks;
    const flag = action.flag;

    //5.1 According to flag, select/de-select all tasks
    tasks.forEach((task) => {
      if(flag){
        task.finished = true;
      } else {
        task.finished = false;
      }
    })

    //5.2 Assign new tempTasks array to new state
    newState.tasks = tasks;
    return newState;
  }
  //6.clean all finished tasks
  if(action.type === DEL_FINISHED_TASKS) {
    //6.0 clone current state
    const newState = JSON.parse(JSON.stringify(state));
    const tasks = newState.tasks;
    const tempTasks = [];

    //6.1 push all unfinished task to new Array
    tasks.forEach((task) => {
      if(!task.finished){
        tempTasks.push(task);
      }
    })

    //6.2 set State and re-rendering
    newState.tasks = tempTasks;
    return newState;
  }

  //7. move task item up and down
  if(action.type === MOVE_TASK) {
    //7.0 clone current state
    const newState = JSON.parse(JSON.stringify(state));
    const tasks = newState.tasks;
    const index = action.index;
    const diff = action.diff;

    //7.1 handle item sorting
    const item = tasks[index];
    tasks.splice(index, 1);
    tasks.splice(index + diff, 0, item);

    //7.2 set state
    newState.tasks = tasks;
    return newState;
  }
  return state;
}


