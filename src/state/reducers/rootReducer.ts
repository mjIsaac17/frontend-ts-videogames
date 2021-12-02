import { combineReducers } from "redux";
import authReducer from "./authReducer";
import companyReducer from "./companyReducer";
import consoleReducer from "./consoleReducer";
import VideogameReducer from "./videogameReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  company: companyReducer,
  console: consoleReducer,
  videogame: VideogameReducer,
});

export type RootStore = ReturnType<typeof rootReducer>;

export default rootReducer;
