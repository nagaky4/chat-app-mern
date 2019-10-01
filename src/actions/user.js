import axios from "axios";
import { BASE_URL } from "../const/index";
import * as types from "../constantTypes/index";

export const fetchUserPending = () => {
  return {
    type: types.FETCH_USER_PENDING
  };
};

export const fectUserSuccess = user => {
  return {
    type: types.FETCH_USER_SUCCESS,
    payload: user
  };
};

export const fectUserError = () => {
  return {
    type: types.FETCH_USER_ERROR
  };
};

export const fecthUser = email => {
  return dispatch => {
    dispatch(fetchUserPending());
    axios
      .get(`${BASE_URL}/user/${email}`)
      .then(res => {
        if (res.status === 200) {
          dispatch(fectUserSuccess(res.data));
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(fectUserSuccess(fectUserError()));
      });
  };
};
