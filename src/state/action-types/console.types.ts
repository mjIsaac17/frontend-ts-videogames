/** Console key types */
export enum ConsoleTypes {
  SUCCESS_GET_CONSOLES = "SUCCESS_GET_CONSOLES",
  CONSOLE_FAILURE_ACTION = "CONSOLE_FAILURE_ACTION",
}

type ConsoleCompanyType = {
  id: string;
  name: string;
};

/** Console Types */
export type ConsoleType = {
  id: string;
  name: string;
  description: string;
  releaseDate: Date;
  companyId: string | ConsoleCompanyType;
  image: Buffer;
  imageType: string;
};

/** State */
export interface ConsoleState {
  consoles: ConsoleType[];
  loading: boolean;
  error?: string;
}

/** Interfaces */
export interface IConsoleGetAll {
  type: ConsoleTypes.SUCCESS_GET_CONSOLES;
  payload: { consoles: ConsoleType[] };
}

export interface IConsoleFailure {
  type: ConsoleTypes.CONSOLE_FAILURE_ACTION;
  payload: { error: string };
}

export type ConsoleDispathTypes = IConsoleGetAll | IConsoleFailure;
