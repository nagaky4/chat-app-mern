import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { userReducer } from "./user";

const reducers = combineReducers({
  form: formReducer,
  authenUser: userReducer
});

export default reducers;
