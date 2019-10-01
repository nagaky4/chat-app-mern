import axios from "axios";
import * as types from "../constantTypes/index";

import { BASE_URL } from "../const/index";

export const loginSuccess = data => {
  return {
    type: types.LOG_IN_SUCCESS,
    payload: data
  };
};

export const loginError = err => {
  return {
    type: types.LOG_IN_ERROR,
    payload: err
  };
};

export const submitLogin = user => {
  return dispatch =>
    axios
      .post(`${BASE_URL}/login`, user)
      .then(res => {
        if (res) {
          dispatch(loginSuccess(res.data));
        }
      })
      .catch(err => {
        dispatch(loginError(err.response.data.message));
      });
};

export const registerSuccess = data => {
  return {
    type: types.LOG_IN_SUCCESS,
    payload: data
  };
};

export const registerError = err => {
  return {
    type: types.LOG_IN_ERROR,
    payload: err
  };
};

export const submitRegister = user => {
  return dispatch =>
    axios
      .post(`${BASE_URL}/register`, user)
      .then(res => {
        if (res) {
          dispatch(loginSuccess(res.data));
        }
      })
      .catch(err => dispatch(loginError(err)));
};

export const submitLogout = () => {
  return {
    type: types.LOG_OUT
  };
};
