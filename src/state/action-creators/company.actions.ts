import { Dispatch } from "redux";

import { httpRequestToken } from "../../helpers/httpRequests";

import { toast } from "react-toastify";
import { RootStore } from "../reducers/rootReducer";
import {
  CompanyDispathTypes,
  CompanyTypes,
  ICompanyFailure,
  ICompanyLoading,
} from "../action-types/company.types";

const failureAction = (error: string): ICompanyFailure => ({
  type: CompanyTypes.COMPANY_FAILURE_ACTION,
  payload: { error },
});

const setLoading = (loading: boolean): ICompanyLoading => ({
  type: CompanyTypes.COMPANY_SET_LOADING,
  payload: { loading },
});

export const companyStartGettingAll = (limit?: number, page?: number) => {
  return async (
    dispatch: Dispatch<CompanyDispathTypes>,
    getState: () => RootStore
  ) => {
    dispatch(setLoading(true));
    const { auth } = getState();
    const { data } = await httpRequestToken(
      "company",
      "GET",
      auth.auth?.authToken || "",
      { limit, page }
    );

    if (data.error) {
      dispatch(failureAction("It was not possible to load the companies"));
      toast.error(data.error);
    } else {
      dispatch({
        type: CompanyTypes.SUCCESS_GET_COMPANIES,
        payload: {
          companies: data.companies,
          totalCompanies: data.count,
          totalPages: data.pages,
        },
      });
    }
    dispatch(setLoading(false));
  };
};
