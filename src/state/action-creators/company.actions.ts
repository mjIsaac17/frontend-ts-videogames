import { Dispatch } from "redux";

import { httpRequestToken } from "../../helpers/httpRequests";

import { toast } from "react-toastify";
import { RootStore } from "../reducers/rootReducer";
import {
  CompanyDispathTypes,
  CompanyType,
  CompanyTypes,
  ICompanyFailure,
} from "../action-types/company.types";

const failureAction = (error: string): ICompanyFailure => ({
  type: CompanyTypes.FAILURE_ACTION,
  payload: { error },
});

export const companyStartGettingAll = () => {
  return async (
    dispatch: Dispatch<CompanyDispathTypes>,
    getState: () => RootStore
  ) => {
    const { auth } = getState();
    const { data } = await httpRequestToken(
      "company",
      "GET",
      auth.auth?.authToken || ""
    );

    if (data.error) {
      dispatch(failureAction("It was not possible to load the companies"));
      toast.error(data.error);
    } else {
      dispatch({
        type: CompanyTypes.SUCCESS_GET_COMPANIES,
        payload: { companies: data.companies as CompanyType[] },
      });
    }
  };
};
