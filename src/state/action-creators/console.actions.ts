import { Dispatch } from "redux";

import { httpRequestToken } from "../../helpers/httpRequests";

import { toast } from "react-toastify";
import { RootStore } from "../reducers/rootReducer";
import {
  ConsoleDispathTypes,
  ConsoleType,
  ConsoleTypes,
  IConsoleFailure,
  IConsoleLoading,
} from "../action-types/console.types";

const failureAction = (error: string): IConsoleFailure => ({
  type: ConsoleTypes.CONSOLE_FAILURE_ACTION,
  payload: { error },
});

const setLoading = (loading: boolean): IConsoleLoading => ({
  type: ConsoleTypes.CONSOLE_SET_LOADING,
  payload: { loading },
});

export const consoleSuccessGet = (
  console: ConsoleType
): ConsoleDispathTypes => ({
  type: ConsoleTypes.SUCCESS_GET_CONSOLE,
  payload: { console },
});

export const consoleStartGet = (consoleName: string) => {
  return async (
    dispatch: Dispatch<ConsoleDispathTypes>,
    getState: () => RootStore
  ) => {
    dispatch(setLoading(true));
    const { auth } = getState();
    const { data } = await httpRequestToken(
      `console/${consoleName}`,
      "GET",
      auth.auth?.authToken || ""
    );

    if (data.error) {
      dispatch(
        failureAction(`It was not possible to load the console ${consoleName}`)
      );
      toast.error(data.error);
    } else {
      console.log(data);
      dispatch(consoleSuccessGet(data.console));
    }
    dispatch(setLoading(false));
  };
};

export const consoleStartGettingAll = (limit?: number, page?: number) => {
  return async (
    dispatch: Dispatch<ConsoleDispathTypes>,
    getState: () => RootStore
  ) => {
    dispatch(setLoading(true));
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
        payload: {
          consoles: data.consoles,
          currentPage: page,
          totalConsoles: data.count,
          totalPages: data.pages,
        },
      });
    }
    dispatch(setLoading(false));
  };
};
