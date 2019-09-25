import * as types from "../constantTypes/index";
import decode from "jwt-decode";
import AuthHelperMethods from "../helpers/AuthHelperMethods";

const Auth = new AuthHelperMethods();

var initialState = {
  user: Auth.user() || null,
  isLogin: Auth.loggedIn() || false,
  err: null
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOG_IN_SUCCESS:
      const token = action.payload;
      localStorage.setItem("token", token);
      state = { ...state, user: decode(token), isLogin: true };
      return state;
    case types.LOG_IN_ERROR:
      state = { ...state, err: action.payload };
      return state;
    case types.LOG_OUT:
      Auth.loggedOut();
      state = { ...initialState };
      return state;
    default:
      return state;
  }
};
