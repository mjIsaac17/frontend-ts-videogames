import { Dispatch } from "redux";

import { httpRequestToken } from "../../helpers/httpRequests";

import { toast } from "react-toastify";
import { RootStore } from "../reducers/rootReducer";
import {
  ConsoleDispathTypes,
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
          totalConsoles: data.count,
          totalPages: data.pages,
        },
      });
    }
    dispatch(setLoading(false));
  };
};
