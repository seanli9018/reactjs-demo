// 导入actionTypes
import {
  ADD_ALL_TASKS,
  ADD_ONE_TASK,
  DEL_ONE_TASK,
  CHANGE_ONE_FINISHED,
  IS_ALL_FINISHED,
  DEL_FINISHED_TASKS,
  MOVE_TASK,
  CHANGE_LOCALE, OPEN_LOADING, CLOSE_LOADING
} from "./actionTypes";

//1.添加所有的已经存在的任务
export const addAllTasks = (tasks)=>{
  return {
    type: ADD_ALL_TASKS,
    tasks
  }
}
//2.添加一条任务
export const addOneTask = (task)=>{
  return {
    type: ADD_ONE_TASK,
    task
  }
}
//3.删除一条任务
export const delOneTask = (taskId)=>{
  return {
    type: DEL_ONE_TASK,
    taskId
  }
}
//4.修改一条任务的完成状态
export const changeOneFinished = (taskId, finishedStatus)=>{
  return {
    type: CHANGE_ONE_FINISHED,
    taskId,
    finishedStatus
  }
}
//5.修改所有任务的完成状态（全选或全部选）
export const isAllFinished = (flag)=>{
  return {
    type: IS_ALL_FINISHED,
    flag
  }
}
//6.清除所有已完成的任务
export const delFinishedTasks = ()=>{
  return {
    type: DEL_FINISHED_TASKS,
  }
}

//7. move task item up and down
export const moveTask = (index, diff) => {
  return{
    type: MOVE_TASK,
    index,
    diff
  }
}

//8. handle locale
export const changeLocale = (localeValue) => {
  return {
    type: CHANGE_LOCALE,
    localeValue
  }
}

//9. global loading open;
export const openLoading = () => {
  return {
    type: OPEN_LOADING,
    loading: true
  }
}

//10. global loading close;
export const closeLoading = () => {
  return {
    type: CLOSE_LOADING,
    loading: false
  }
}