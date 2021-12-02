import { Dispatch } from "redux";

import { httpRequestToken } from "../../helpers/httpRequests";

import { toast } from "react-toastify";
import { RootStore } from "../reducers/rootReducer";
import {
  VideogameDispathTypes,
  VideogameType,
  VideogameTypes,
  IVideogameFailure,
} from "../action-types/videogame.types";

const failureAction = (error: string): IVideogameFailure => ({
  type: VideogameTypes.VIDEOGAME_FAILURE_ACTION,
  payload: { error },
});

export const videogameStartGettingAll = (limit?: number, page?: number) => {
  return async (
    dispatch: Dispatch<VideogameDispathTypes>,
    getState: () => RootStore
  ) => {
    const { auth } = getState();
    const { data } = await httpRequestToken(
      "Videogame",
      "GET",
      auth.auth?.authToken || "",
      { limit, page }
    );
    if (data.error) {
      dispatch(failureAction("It was not possible to load the videogames"));
      toast.error(data.error);
    } else {
      dispatch({
        type: VideogameTypes.SUCCESS_GET_VIDEOGAMES,
        payload: { videogames: data.videogames as VideogameType[] },
      });
    }
  };
};
