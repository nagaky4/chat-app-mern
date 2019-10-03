import * as types from "../constantTypes/index";
import { BASE_URL } from "../const/index";
import axios from "axios";

export const findUserPending = () => {
  return {
    type: types.FIND_USER_PENDING
  };
};

export const findUserSuccess = users => {
  return {
    type: types.FIND_USER_SUCCESS,
    payload: {
      users: users
    }
  };
};

export const findUserError = err => {
  return {
    type: types.FIND_USER_ERROR,
    payload: {
      error: err
    }
  };
};

export const searchUser = value => {
  return dispatch => {
    dispatch(findUserPending());
    axios
      .get(`${BASE_URL}/users?find=${value}`)
      .then(res => {
        dispatch(findUserSuccess(res.data));
      })
      .catch(err => {
        console.log(err.response);
        dispatch(findUserError(err.response.data));
      });
  };
};
