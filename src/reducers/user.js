import * as types from "../constantTypes/index";

var initialState = {
  user: null,
  loading: false
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USER_PENDING:
      state = { ...state, loading: true };
      return { ...state };
    case types.FETCH_USER_SUCCESS:
      state = {
        user: action.payload,
        loading: false
      };
      return { ...state };
    case types.FETCH_USER_ERROR:
      state = {
        user: null,
        loading: false
      };
      return { ...state };
    default:
      return state;
  }
};
