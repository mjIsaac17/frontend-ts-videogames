/** Videogame key types */
export enum VideogameTypes {
  SUCCESS_GET_VIDEOGAME = "SUCCESS_GET_VIDEOGAME",
  SUCCESS_GET_VIDEOGAMES = "SUCCESS_GET_VIDEOGAMES",
  VIDEOGAME_FAILURE_ACTION = "VIDEOGAME_FAILURE_ACTION",
  VIDEOGAME_SET_LOADING = "VIDEOGAME_SET_LOADING",
}

type VideogameCompanyType = {
  id: string;
  name: string;
};

type VideogameConsoleType = {
  id: string;
  name: string;
};

/** Videogame Types */
export type VideogameType = {
  id: string;
  name: string;
  description: string;
  releaseDate: Date;
  companies: VideogameCompanyType[];
  consoles: VideogameConsoleType[];
  image: Buffer;
  imageType: string;
};

/** State */
export interface VideogameState {
  videogames: VideogameType[];
  loading: boolean;
  currentVideogame?: VideogameType;
  error?: string;
  totalVideogames?: number;
  totalPages?: number;
}

/** Interfaces */
export interface IVideogameGet {
  type: VideogameTypes.SUCCESS_GET_VIDEOGAME;
  payload: { videogame: VideogameType };
}

export interface IVideogameGetAll {
  type: VideogameTypes.SUCCESS_GET_VIDEOGAMES;
  payload: {
    videogames: VideogameType[];
    totalVideogames: number;
    totalPages: number;
  };
}

export interface IVideogameFailure {
  type: VideogameTypes.VIDEOGAME_FAILURE_ACTION;
  payload: { error: string };
}

export interface IVideogameLoading {
  type: VideogameTypes.VIDEOGAME_SET_LOADING;
  payload: { loading: boolean };
}

export type VideogameDispathTypes =
  | IVideogameGet
  | IVideogameGetAll
  | IVideogameFailure
  | IVideogameLoading;
