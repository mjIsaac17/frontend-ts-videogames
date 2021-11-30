import { combineReducers } from "redux";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  auth: authReducer,
});

export type RootStore = ReturnType<typeof rootReducer>;

export default rootReducer;
