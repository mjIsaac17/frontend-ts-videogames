import {
  VideogameDispathTypes,
  VideogameState,
  VideogameTypes,
} from "../action-types/videogame.types";

const defaultState: VideogameState = {
  loading: true,
  videogames: [],
};

const VideogameReducer = (
  state: VideogameState = defaultState,
  action: VideogameDispathTypes
): VideogameState => {
  switch (action.type) {
    case VideogameTypes.SUCCESS_GET_VIDEOGAME:
      return {
        ...state,
        currentVideogame: action.payload.videogame,
      };

    case VideogameTypes.SUCCESS_GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload.videogames,
        totalVideogames: action.payload.totalVideogames,
        totalPages: action.payload.totalPages,
      };
    case VideogameTypes.VIDEOGAME_FAILURE_ACTION:
      return {
        loading: false,
        videogames: [],
        error: action.payload.error,
      };

    case VideogameTypes.VIDEOGAME_SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      };

    default:
      return state;
  }
};

export default VideogameReducer;
