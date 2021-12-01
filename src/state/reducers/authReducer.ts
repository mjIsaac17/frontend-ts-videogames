import {
  AuthDispathTypes,
  AuthTypes,
  AuthState,
  AuthType,
} from "../action-types/auth.types";

const defaultState: AuthState = {
  loading: false,
  auth: localStorage.getItem("auth")
    ? (JSON.parse(localStorage.getItem("auth") || "{}") as AuthType)
    : null,
};

const authReducer = (
  state: AuthState = defaultState,
  action: AuthDispathTypes
): AuthState => {
  switch (action.type) {
    case AuthTypes.AUTH_LOGIN:
      return {
        loading: false,
        auth: {
          user: action.payload.user,
          authToken: action.payload.authToken,
          refreshToken: action.payload.refreshToken,
        },
      };

    case AuthTypes.AUTH_LOGOUT:
      return {
        loading: false,
        auth: null,
      };

    case AuthTypes.AUTH_LOADING:
      return {
        loading: true,
      };

    default:
      return state;
  }
};

export default authReducer;
