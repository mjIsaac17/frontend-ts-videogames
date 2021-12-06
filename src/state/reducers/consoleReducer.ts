import {
  ConsoleDispathTypes,
  ConsoleState,
  ConsoleTypes,
} from "../action-types/console.types";

const defaultState: ConsoleState = {
  loading: true,
  consoles: [],
};

const consoleReducer = (
  state: ConsoleState = defaultState,
  action: ConsoleDispathTypes
): ConsoleState => {
  switch (action.type) {
    case ConsoleTypes.SUCCESS_GET_CONSOLES:
      console.log(action);
      return {
        ...state,
        loading: false,
        consoles: action.payload.consoles,
        totalConsoles: action.payload.totalConsoles,
        totalPages: action.payload.totalPages,
      };
    case ConsoleTypes.CONSOLE_FAILURE_ACTION:
      return {
        loading: false,
        consoles: [],
        error: action.payload.error,
      };
    case ConsoleTypes.CONSOLE_SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      };

    default:
      return state;
  }
};

export default consoleReducer;
