import * as types from "../constantTypes/index";

var initialState = {
  token: null,
  email: null,
  isLogin: false,
  err: null
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOG_IN_SUCCESS:
      console.log("data", action.payload);
      state = { ...action.payload, isLogin: true };
      return state;
    case types.LOG_IN_ERROR:
      state = { ...state, err: action.payload };
      return state;
    case types.LOG_OUT:
      state = { ...initialState };
      return state;
    default:
      return state;
  }
};
