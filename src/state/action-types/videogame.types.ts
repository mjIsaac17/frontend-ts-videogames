/** Videogame key types */
export enum VideogameTypes {
  SUCCESS_GET_VIDEOGAMES = "SUCCESS_GET_VIDEOGAMES",
  VIDEOGAME_FAILURE_ACTION = "VIDEOGAME_FAILURE_ACTION",
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
  error?: string;
}

/** Interfaces */
export interface IVideogameGetAll {
  type: VideogameTypes.SUCCESS_GET_VIDEOGAMES;
  payload: { videogames: VideogameType[] };
}

export interface IVideogameFailure {
  type: VideogameTypes.VIDEOGAME_FAILURE_ACTION;
  payload: { error: string };
}

export type VideogameDispathTypes = IVideogameGetAll | IVideogameFailure;
