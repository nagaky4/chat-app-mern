import * as types from "../constantTypes/index";

var initialState = {
  friends: [],
  error: null,
  loading: false,
  successMess: null
};

export const friendReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_FRIEND_PENDING:
      state = {
        ...state,
        loading: true
      };

      return state;

    case types.FETCH_FRIEND_SUCCESS:
      state = {
        ...state,
        friends: action.payload.friends,
        loading: false,
        error: null
      };
      return state;
    case types.FETCH_FRIEND_SUCCESS_MESS:
      state = {
        ...state,
        loading: false,
        error: null,
        successMess: action.payload.successMess
      };
      return state;
    case types.FETCH_FRIEND_ERROR:
      state = {
        ...state,
        loading: false,
        error: action.payload.error
      };

      return state;
    default:
      return state;
  }
};
