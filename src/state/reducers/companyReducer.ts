import {
  CompanyDispathTypes,
  CompanyState,
  CompanyTypes,
} from "../action-types/company.types";

const defaultState: CompanyState = {
  loading: true,
  companies: [],
};

const companyReducer = (
  state: CompanyState = defaultState,
  action: CompanyDispathTypes
): CompanyState => {
  switch (action.type) {
    case CompanyTypes.SUCCESS_GET_COMPANIES:
      return {
        ...state,
        companies: action.payload.companies,
        totalCompanies: action.payload.totalCompanies,
        totalPages: action.payload.totalPages,
      };
    case CompanyTypes.COMPANY_FAILURE_ACTION:
      return {
        loading: false,
        companies: [],
        error: action.payload.error,
      };

    case CompanyTypes.COMPANY_SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      };

    default:
      return state;
  }
};

export default companyReducer;
