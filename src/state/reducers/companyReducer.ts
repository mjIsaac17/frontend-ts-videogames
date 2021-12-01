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
        loading: false,
        companies: action.payload.companies,
      };
    case CompanyTypes.FAILURE_ACTION:
      return {
        loading: false,
        companies: [],
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default companyReducer;
