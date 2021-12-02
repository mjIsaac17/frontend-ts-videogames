import { combineReducers } from "redux";
import authReducer from "./authReducer";
import companyReducer from "./companyReducer";
import consoleReducer from "./consoleReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  company: companyReducer,
  console: consoleReducer,
});

export type RootStore = ReturnType<typeof rootReducer>;

export default rootReducer;
