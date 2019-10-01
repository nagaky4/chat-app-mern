import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { AuthReducer } from "./authen";
import { userReducer } from "./user";

const reducers = combineReducers({
  form: formReducer,
  authen: AuthReducer,
  userReducer: userReducer
});

export default reducers;
