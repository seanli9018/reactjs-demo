// 1. import actionTypes
import {
  CHANGE_LOCALE,
  OPEN_LOADING,
  CLOSE_LOADING
} from "./globalActionTypes";

//1.1 import language instance
import lang from '../languages/lang';

// 2. reducer: create default state
const defaultState = {
  locale: lang.userLanguage,
  loading: false
}

// 3. reducer: core methods based on action type
export default function globalReducer(state=defaultState, action){
  //1. Change locale
  if(action.type === CHANGE_LOCALE) {
    // 1.0 clone current state
    const newState = JSON.parse(JSON.stringify(state));
    const localeValue = action.localeValue;

    // 1.1 handle change locale
    newState.locale = localeValue;

    // 1.2 set state
    return newState
  }
  //2. global loading open;
  if(action.type === OPEN_LOADING) {
    // 2.0 clone current state
    const newState = JSON.parse(JSON.stringify(state));
    const loading = action.loading;

    // 2.1 handle change loading status to true
    newState.loading = loading;

    // 2.2 set state
    return newState
  }
  //3. global loading close;
  if(action.type === CLOSE_LOADING) {
    // 3.0 clone current state
    const newState = JSON.parse(JSON.stringify(state));
    const loading = action.loading;

    // 3.1 handle change loading status to false
    newState.loading = loading;

    // 3.2 set state
    return newState
  }
  return state;
}


