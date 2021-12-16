import { Dispatch } from "redux";

import { httpRequestToken } from "../../helpers/httpRequests";

import { toast } from "react-toastify";
import { RootStore } from "../reducers/rootReducer";
import {
  CompanyAddType,
  CompanyDispathTypes,
  CompanyType,
  CompanyTypes,
  ICompanyAdd,
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

const companySuccessAdd = (company: CompanyType): ICompanyAdd => ({
  type: CompanyTypes.COMPANY_SUCCESS_ADD,
  payload: { company },
});

export const companySetCurrent = (
  company?: CompanyType
): CompanyDispathTypes => ({
  type: CompanyTypes.COMPANY_SET_CURRENT,
  payload: { company },
});

export const companyStartGet = (companyName: string) => {
  return async (
    dispatch: Dispatch<CompanyDispathTypes>,
    getState: () => RootStore
  ) => {
    dispatch(setLoading(true));
    const { auth } = getState();
    const { data } = await httpRequestToken(
      `company/${companyName}`,
      "GET",
      auth.auth?.authToken || ""
    );

    if (data.error) {
      dispatch(
        failureAction(`It was not possible to load the company ${companyName}`)
      );
      toast.error(data.error);
    } else {
      dispatch(companySetCurrent(data.company));
    }
    dispatch(setLoading(false));
  };
};

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
          currentPage: page,
          totalCompanies: data.count,
          totalPages: data.pages,
        },
      });
    }
    dispatch(setLoading(false));
  };
};

export const companyStartAdd = (company: CompanyAddType) => {
  return async (
    dispatch: Dispatch<CompanyDispathTypes>,
    getState: () => RootStore
  ) => {
    const { auth } = getState();
    const { data } = await httpRequestToken(
      "company",
      "POST",
      auth.auth?.authToken || "",
      undefined,
      company
    );

    if (data.error) {
      dispatch(failureAction(data.error));
      toast.error("An error ocurred when trying to add the company");
    } else {
      dispatch(companySuccessAdd(data.company));
      toast.success("Company added");
    }
  };
};

export const companyStartUpdate = (
  company: CompanyAddType,
  companyId: string
) => {
  return async (
    dispatch: Dispatch<CompanyDispathTypes>,
    getState: () => RootStore
  ) => {
    const { auth } = getState();
    const { data } = await httpRequestToken(
      `company/${companyId}`,
      "PUT",
      auth.auth?.authToken || "",
      undefined,
      company
    );

    if (data.error) {
      dispatch(failureAction(data.error));
      toast.error("An error ocurred when trying to update the company");
    } else {
      dispatch({
        type: CompanyTypes.SUCCESS_UPDATE_COMPANY,
        payload: {
          company: data.company,
        },
      });
      //console.log(data);
      toast.success("Company updated");
    }
  };
};
