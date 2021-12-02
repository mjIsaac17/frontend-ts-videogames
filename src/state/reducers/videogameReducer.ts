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
    case VideogameTypes.SUCCESS_GET_VIDEOGAMES:
      return {
        ...state,
        loading: false,
        videogames: action.payload.videogames,
      };
    case VideogameTypes.VIDEOGAME_FAILURE_ACTION:
      return {
        loading: false,
        videogames: [],
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default VideogameReducer;
