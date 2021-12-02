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
      };
    case ConsoleTypes.CONSOLE_FAILURE_ACTION:
      return {
        loading: false,
        consoles: [],
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default consoleReducer;
