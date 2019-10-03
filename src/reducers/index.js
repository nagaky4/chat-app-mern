import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { AuthReducer } from "./authen";
import { userReducer } from "./user";
import { findUserReducer } from "./findUser";
import { friendReducer } from "./friend";
const reducers = combineReducers({
  form: formReducer,
  authen: AuthReducer,
  userReducer: userReducer,
  findUserReducer: findUserReducer,
  friendReducer: friendReducer
});

export default reducers;
