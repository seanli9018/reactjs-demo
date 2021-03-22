import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

// import Redux react-redux;
import { Provider } from 'react-redux';
import store from '../src/store/index';

import notice from '../src/utils/notification';
import modal from '../src/utils/modal';
import lang from '../src/languages/lang';

// React.$notification = (message) => {
//   console.log(message);
//   notification.success({message: message});
// }

// bind notice class instance to React globally
React.$notice = notice;
//bind modal class instance to React globally
React.$modal = modal;
// bind lang class to React globally
React.$lang = lang;

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
