import { combineReducers } from "redux";
import authReducer from "./authReducer";
import companyReducer from "./companyReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  company: companyReducer,
});

export type RootStore = ReturnType<typeof rootReducer>;

export default rootReducer;
