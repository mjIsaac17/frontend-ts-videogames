import { Dispatch } from "redux";

import { httpRequestToken } from "../../helpers/httpRequests";

import { toast } from "react-toastify";
import { RootStore } from "../reducers/rootReducer";
import {
  VideogameDispathTypes,
  VideogameTypes,
  IVideogameFailure,
  IVideogameLoading,
  VideogameType,
} from "../action-types/videogame.types";

const failureAction = (error: string): IVideogameFailure => ({
  type: VideogameTypes.VIDEOGAME_FAILURE_ACTION,
  payload: { error },
});

const setLoading = (loading: boolean): IVideogameLoading => ({
  type: VideogameTypes.VIDEOGAME_SET_LOADING,
  payload: { loading },
});

export const videogameSuccessGet = (
  videogame: VideogameType
): VideogameDispathTypes => ({
  type: VideogameTypes.SUCCESS_GET_VIDEOGAME,
  payload: { videogame },
});

export const videogameStartGet = (videogameName: string) => {
  return async (
    dispatch: Dispatch<VideogameDispathTypes>,
    getState: () => RootStore
  ) => {
    dispatch(setLoading(true));
    const { auth } = getState();
    const { data } = await httpRequestToken(
      `videogame/${videogameName}`,
      "GET",
      auth.auth?.authToken || ""
    );

    if (data.error) {
      dispatch(
        failureAction(
          `It was not possible to load the videogame ${videogameName}`
        )
      );
      toast.error(data.error);
    } else {
      console.log(data.videogame);
      dispatch(videogameSuccessGet(data.videogame));
    }
    dispatch(setLoading(false));
  };
};

export const videogameStartGettingAll = (limit?: number, page?: number) => {
  return async (
    dispatch: Dispatch<VideogameDispathTypes>,
    getState: () => RootStore
  ) => {
    dispatch(setLoading(true));
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
        payload: {
          currentPage: page,
          totalVideogames: data.count,
          totalPages: data.pages,
          videogames: data.videogames,
        },
      });
    }
    dispatch(setLoading(false));
  };
};
