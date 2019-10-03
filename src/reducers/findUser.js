import * as types from "../constantTypes/index";
var initialState = {
  users: [],
  error: null,
  loading: false
};

export const findUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FIND_USER_PENDING:
      state = {
        ...state,
        loading: true
      };

      return state;

    case types.FIND_USER_SUCCESS:
      state = {
        ...state,
        users: action.payload.users,
        loading: false,
        error: null
      };
      return state;
    case types.FIND_USER_ERROR:
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
