import { combineReducers } from "redux";
import userReducer from "./user";
import postReducer from "./posts";
const rootReducer = combineReducers({ userReducer, postReducer });
export default rootReducer;
