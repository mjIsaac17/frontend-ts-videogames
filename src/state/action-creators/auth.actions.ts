import { Dispatch } from "redux";

import { AuthDispathTypes, AuthTypes } from "../action-types/auth.types";
import { httpPost } from "../../helpers/httpRequests";

import { toast } from "react-toastify";

export const startLogin = (email: string, password: string) => {
  return async (dispatch: Dispatch<AuthDispathTypes>) => {
    const { data } = await httpPost("auth", { email, password });

    if (data.error) toast.error(data.error);
    else
      dispatch({
        type: AuthTypes.AUTH_LOGIN,
        payload: { ...data },
      });
  };
};
