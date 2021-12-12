/** Console key types */
export enum ConsoleTypes {
  SUCCESS_GET_CONSOLE = "SUCCESS_GET_CONSOLE",
  SUCCESS_GET_CONSOLES = "SUCCESS_GET_CONSOLES",
  CONSOLE_FAILURE_ACTION = "CONSOLE_FAILURE_ACTION",
  CONSOLE_SET_LOADING = "CONSOLE_SET_LOADING",
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
  companyId: ConsoleCompanyType;
  image: Buffer;
  imageType: string;
};

/** State */
export interface ConsoleState {
  consoles: ConsoleType[];
  currentConsole?: ConsoleType;
  currentPage?: number;
  loading: boolean;
  error?: string;
  totalConsoles?: number;
  totalPages?: number;
}

/** Interfaces */
export interface IConsoleGet {
  type: ConsoleTypes.SUCCESS_GET_CONSOLE;
  payload: { console: ConsoleType };
}

export interface IConsoleGetAll {
  type: ConsoleTypes.SUCCESS_GET_CONSOLES;
  payload: {
    consoles: ConsoleType[];
    currentPage: number | undefined;
    totalConsoles: number;
    totalPages: number;
  };
}

export interface IConsoleFailure {
  type: ConsoleTypes.CONSOLE_FAILURE_ACTION;
  payload: { error: string };
}

export interface IConsoleLoading {
  type: ConsoleTypes.CONSOLE_SET_LOADING;
  payload: { loading: boolean };
}

export type ConsoleDispathTypes =
  | IConsoleGet
  | IConsoleGetAll
  | IConsoleFailure
  | IConsoleLoading;
