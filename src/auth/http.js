// import axios xmlhttprequest package;
import axios from 'axios';

// import actions to handle global loading effects
import {openLoading, closeLoading} from "../store/actionCreators";

// import store for dispatching above actions
import store from "../store/index"

// func for calculator current api request count which decides open/close loading effects
let requestCount = 0;

function showGlobalLoading() {
  if(requestCount === 0) { //if there is no previous requests, show loading
    store.dispatch(openLoading())
  }
  requestCount ++; //increment 1 request count
}

function hideGlobalLoading() {
  if(requestCount <= 1) { // if this is the last request, we hide loading;
    store.dispatch(closeLoading());
  }
  requestCount --; // we decrease 1 request count
}

// the cors-anywhere is prefix is for compatibale with github pages https to send request to http api;
const BASE_URL = 'https://cors-anywhere.herokuapp.com/http://makeup-api.herokuapp.com/api/v1/products.json';
// const BASE_URL = 'http://makeup-api.herokuapp.com/api/v1/products.json';

class Http {
  constructor() {
    this.http = axios.create({
      baseURL: BASE_URL
    })

    // Add a request interceptor
    this.http.interceptors.request.use(config => {
      // set store.loading to true, start global page loading effects.
      showGlobalLoading();
      return config;
    }, error => {
      // Do something with request error
      hideGlobalLoading();
      return Promise.reject(error);
    })

    // Add a response interceptor
    this.http.interceptors.response.use(response => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      hideGlobalLoading();
      // Do something with response data
      return response;
    }, error => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      hideGlobalLoading();
      // Do something with response error
      return Promise.reject(error);
    })
  }

  getLipSticks() {
    const url = '?product_type=lipstick';
    return this.http.get(url);
  }

  getNailPolish() {
    const url = '?product_type=nail_polish';
    return this.http.get(url);
  }

  getMascara() {
    const url = '?product_type=mascara';
    return this.http.get(url);
  }

  getLipLiner() {
    const url = '?product_type=lip_liner';
    return this.http.get(url);
  }

  getFoundation() {
    const url = '?product_type=foundation';
    return this.http.get(url);
  }

  getProductDetail(id) {
    const url = `/${id}`
    return this.http.get(url);
  }
  // getMovieDetails(movieId) {
  //   const url = '/title/get-details?tconst=' + movieId;
  //   return this.http.get(url);
  // }
}

export default new Http();
