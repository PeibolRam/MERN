import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import postsReducer from './postReducers'
export default combineReducers({
  auth: authReducer,
  post: postsReducer,
  errors: errorReducer
});
