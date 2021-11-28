/** Auth key types */
export enum AuthTypes {
  AUTH_LOGIN = "LOGIN",
  AUTH_LOGOUT = "LOGOUT",
  AUTH_LOADING = "LOADING",
}

/** Auth Types */
export type UserType = {
  id: string;
  name: string;
  roleId: string;
};

export type AuthType = {
  user: UserType;
  authToken: string;
  refreshToken: string;
};

/** State */
export interface AuthState {
  auth?: AuthType | null;
  loading: boolean;
}

/** Interfaces */
export interface IAuthLogin {
  type: AuthTypes.AUTH_LOGIN;
  payload: AuthType;
}

export interface IAuthLogout {
  type: AuthTypes.AUTH_LOGOUT;
}

export interface IAuthLoading {
  type: AuthTypes.AUTH_LOADING;
}

export type AuthDispathTypes = IAuthLogin | IAuthLogout | IAuthLoading;
