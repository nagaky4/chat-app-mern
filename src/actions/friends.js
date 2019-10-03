import * as types from "../constantTypes/index";
import { BASE_URL } from "../const/index";
import axios from "axios";

export const fetchFriendPending = () => {
  return {
    type: types.FETCH_FRIEND_PENDING
  };
};

export const fetchFriendSuccess = friends => {
  return {
    type: types.FETCH_FRIEND_SUCCESS,
    payload: {
      friends: friends
    }
  };
};

export const fetchFriendError = err => {
  return {
    type: types.FETCH_FRIEND_ERROR,
    payload: {
      error: err
    }
  };
};

export const fetchSuccess = successMess => {
  return {
    type: types.FETCH_FRIEND_SUCCESS_MESS,
    payload: {
      successMess: successMess
    }
  };
};

export const makeFriend = (idUser, idFriend) => {
  return dispatch => {
    dispatch(fetchFriendPending());
    axios
      .post(`${BASE_URL}/user/friend`, { idUser, idFriend })
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        console.log(err.response);
        dispatch(fetchFriendError(err.response.data));
      });
  };
};

export const acceptFriend = (idUser, idFriend) => {
  return dispatch => {
    dispatch(fetchFriendPending());
    axios
      .post(`${BASE_URL}/user/accept-friend`, { idUser, idFriend })
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        console.log(err.response);
        dispatch(fetchFriendError(err.response.data));
      });
  };
};

export const loadFriends = idUser => {
  return dispatch => {
    dispatch(fetchFriendPending());
    axios
      .get(`${BASE_URL}/user-friends?idUser=${idUser}`)
      .then(res => {
        console.log("res", res);
        dispatch(fetchFriendSuccess(res.data));
      })
      .catch(err => {
        console.log(err.response);
        dispatch(fetchFriendError(err.response.data));
      });
  };
};
