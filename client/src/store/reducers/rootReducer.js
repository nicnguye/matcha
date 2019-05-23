import { combineReducers } from "redux";
import authReducer from "./authReducer";
import matchReducer from "./matchReducer";
import convReducer from "./convReducer";
import errorReducer from "./errorReducer";
import successReducer from "./successReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  match: matchReducer,
  conv: convReducer,
  errors: errorReducer,
  success: successReducer
});

export default rootReducer;
