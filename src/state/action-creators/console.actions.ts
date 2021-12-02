import { Dispatch } from "redux";

import { httpRequestToken } from "../../helpers/httpRequests";

import { toast } from "react-toastify";
import { RootStore } from "../reducers/rootReducer";
import {
  ConsoleDispathTypes,
  ConsoleType,
  ConsoleTypes,
  IConsoleFailure,
} from "../action-types/console.types";

const failureAction = (error: string): IConsoleFailure => ({
  type: ConsoleTypes.CONSOLE_FAILURE_ACTION,
  payload: { error },
});

export const consoleStartGettingAll = (limit?: number, page?: number) => {
  return async (
    dispatch: Dispatch<ConsoleDispathTypes>,
    getState: () => RootStore
  ) => {
    const { auth } = getState();
    const { data } = await httpRequestToken(
      "console",
      "GET",
      auth.auth?.authToken || "",
      { limit, page }
    );
    if (data.error) {
      dispatch(failureAction("It was not possible to load the consoles"));
      toast.error(data.error);
    } else {
      dispatch({
        type: ConsoleTypes.SUCCESS_GET_CONSOLES,
        payload: { consoles: data.consoles as ConsoleType[] },
      });
    }
  };
};
