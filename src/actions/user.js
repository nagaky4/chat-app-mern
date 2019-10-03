import axios from "axios";
import { BASE_URL } from "../const/index";
import * as types from "../constantTypes/index";

export const fetchUserPending = () => {
  return {
    type: types.FETCH_USER_PENDING
  };
};

export const fectUserSuccess = (user, successMess) => {
  return {
    type: types.FETCH_USER_SUCCESS,
    payload: {
      user: user,
      success: successMess
    }
  };
};

export const uploadAvatarSuccess = (email, successMess) => {
  return dispatch => {
    dispatch(fecthUser(email, successMess));
  };
};

export const uploadAvatarError = errorMess => {
  return dispatch => {
    dispatch(fectUserError(errorMess));
  };
};

export const fectUserError = err => {
  return {
    type: types.FETCH_USER_ERROR,
    payload: {
      error: err
    }
  };
};

export const fecthUser = (email, successMess) => {
  return dispatch => {
    dispatch(fetchUserPending());
    axios
      .get(`${BASE_URL}/user/${email}`)
      .then(res => {
        if (res.status === 200) {
          dispatch(fectUserSuccess(res.data, successMess));
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(fectUserError(err));
      });
  };
};

export const updateUser = user => {
  return dispatch => {
    dispatch(fetchUserPending());
    axios
      .put(`${BASE_URL}/user`, { user: user })
      .then(res => {
        if (res.status === 200) {
          const successMess = res.data.successMess;
          dispatch(fecthUser(user.email, successMess));
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(fectUserError(err));
      });
  };
};

export const changePassUser = user => {
  return dispatch => {
    dispatch(fetchUserPending());
    axios
      .patch(`${BASE_URL}/account/password`, { user: user })
      .then(res => {
        if (res.status === 200) {
          const successMess = res.data.successMess;
          dispatch(fecthUser(user.email, successMess));
        }
      })
      .catch(err => {
        if (err.response.data.errorMess) {
          dispatch(fectUserError(err.response.data.errorMess));
        } else dispatch(fectUserError(err));
      });
  };
};
