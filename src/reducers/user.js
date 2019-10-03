import * as types from "../constantTypes/index";

var initialState = {
  user: null,
  loading: false,
  error: null,
  success: null
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USER_PENDING:
      state = { ...state, loading: true, error: null, success: null };
      return { ...state };
    case types.FETCH_USER_SUCCESS:
      state = {
        user: action.payload.user,
        loading: false,
        error: null,
        success: action.payload.success
      };
      return { ...state };
      
    case types.FETCH_USER_ERROR:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
        success: null
      };
      return { ...state };
    default:
      return state;
  }
};
