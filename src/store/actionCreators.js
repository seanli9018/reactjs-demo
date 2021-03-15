// 导入actionTypes
import {
  ADD_ALL_TASKS,
  ADD_ONE_TASK,
  DEL_ONE_TASK,
  CHANGE_ONE_FINISHED,
  IS_ALL_FINISHED,
  DEL_FINISHED_TASKS
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