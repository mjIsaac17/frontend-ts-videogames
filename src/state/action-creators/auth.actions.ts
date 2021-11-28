import { Dispatch } from "redux";

import { AuthDispathTypes, AuthTypes } from "../action-types/login.types";
import { httpPost } from "../../helpers/httpRequests";

export const startLogin = (email: string, password: string) => {
  return async (dispatch: Dispatch<AuthDispathTypes>) => {
    const res = await httpPost("auth", { email, password });
    console.log(res);
    // dispatch({
    //     type: AuthTypes.AUTH_LOGIN,
    //     payload: {

    //     }
    // })
  };
};
