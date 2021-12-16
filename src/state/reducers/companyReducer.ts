import {
  CompanyDispathTypes,
  CompanyState,
  CompanyTypes,
} from "../action-types/company.types";

const defaultState: CompanyState = {
  currentCompany: {
    _id: "",
    name: "",
    shortDescription: "",
    description: "",
    image: new Buffer(0),
    imageType: "",
  },
  loading: true,
  companies: [],
};

const companyReducer = (
  state: CompanyState = defaultState,
  action: CompanyDispathTypes
): CompanyState => {
  switch (action.type) {
    case CompanyTypes.COMPANY_SET_CURRENT:
      const company = action.payload.company;
      return {
        ...state,
        currentCompany: company ? company : defaultState.currentCompany,
      };

    case CompanyTypes.SUCCESS_GET_COMPANIES:
      return {
        ...state,
        companies: action.payload.companies,
        currentPage: action.payload.currentPage,
        totalCompanies: action.payload.totalCompanies,
        totalPages: action.payload.totalPages,
      };

    case CompanyTypes.SUCCESS_UPDATE_COMPANY:
      return {
        ...state,
        companies: state.companies.map((company) =>
          company._id !== action.payload.company._id
            ? company
            : action.payload.company
        ),
      };

    case CompanyTypes.COMPANY_SUCCESS_ADD:
      return {
        ...state,
        companies: [...state.companies, action.payload.company],
      };

    case CompanyTypes.COMPANY_FAILURE_ACTION:
      return {
        ...state,
        loading: false,
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
