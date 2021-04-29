import { createStore, combineReducers }  from 'redux';
import taskReducer from '../components/todo/store/taskReducers';
import globalReducer from '../store/globalReducers';

const rootReducer = combineReducers({
    taskState: taskReducer,
    globalState: globalReducer
})

const store = createStore(rootReducer);

export default store;