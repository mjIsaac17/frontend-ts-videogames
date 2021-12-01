import { Dispatch } from "redux";

import {
  AuthDispathTypes,
  AuthType,
  AuthTypes,
} from "../action-types/auth.types";
import { httpPost } from "../../helpers/httpRequests";

import { toast } from "react-toastify";

const saveAuthInLocalStorage = (auth: AuthType) => {
  localStorage.setItem("auth", JSON.stringify(auth));
};

export const startLogin = (email: string, password: string) => {
  return async (dispatch: Dispatch<AuthDispathTypes>) => {
    const { data } = await httpPost("auth", { email, password });

    if (data.error) toast.error(data.error);
    else {
      saveAuthInLocalStorage(data);
      dispatch({
        type: AuthTypes.AUTH_LOGIN,
        payload: { ...data },
      });
    }
  };
};

export const startRegister = (
  name: string,
  email: string,
  password: string
) => {
  return async (dispatch: Dispatch<AuthDispathTypes>) => {
    const { data } = await httpPost("user", { name, email, password });

    if (data.error) toast.error(data.error);
    else {
      saveAuthInLocalStorage(data);

      dispatch({
        type: AuthTypes.AUTH_LOGIN,
        payload: { ...data },
      });
    }
  };
};
