// 导入actionTypes
import {
  CHANGE_LOCALE, 
  OPEN_LOADING, 
  CLOSE_LOADING
} from "./globalActionTypes";

//1. handle locale
export const changeLocale = (localeValue) => {
  return {
    type: CHANGE_LOCALE,
    localeValue
  }
}

//2. global loading open;
export const openLoading = () => {
  return {
    type: OPEN_LOADING,
    loading: true
  }
}

//3. global loading close;
export const closeLoading = () => {
  return {
    type: CLOSE_LOADING,
    loading: false
  }
}