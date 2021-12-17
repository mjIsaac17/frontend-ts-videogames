/** Company key types */
export enum CompanyTypes {
  COMPANY_SET_CURRENT = "COMPANY_SET_CURRENT",
  COMPANY_SUCCESS_ADD = "COMPANY_SUCCESS_ADD",
  SUCCESS_GET_COMPANIES = "SUCCESS_GET_COMPANIES",
  SUCCESS_UPDATE_COMPANY = "SUCCESS_UPDATE_COMPANY",
  COMPANY_SUCCESS_DELETE = "COMPANY_SUCCESS_DELETE",
  COMPANY_FAILURE_ACTION = "COMPANY_FAILURE_ACTION",
  COMPANY_SET_LOADING = "COMPANY_SET_LOADING",
}

/** Company Types */
export type CompanyType = {
  _id: string;
  name: string;
  shortDescription: string;
  description: string;
  image: Buffer;
  imageType: string;
  active: boolean;
};

export type CompanyAddType = {
  name: string;
  shortDescription: string;
  description: string;
  image: File;
};

/** State */
export interface CompanyState {
  companies: CompanyType[];
  currentCompany: CompanyType;
  currentPage?: number;
  loading: boolean;
  totalCompanies?: number;
  totalPages?: number;
  error?: string;
}

/** Interfaces */
export interface ICompanySetCurrent {
  type: CompanyTypes.COMPANY_SET_CURRENT;
  payload: { company?: CompanyType };
}

export interface ICompanyGetAll {
  type: CompanyTypes.SUCCESS_GET_COMPANIES;
  payload: {
    companies: CompanyType[];
    currentPage: number | undefined;
    totalCompanies: number;
    totalPages: number;
  };
}

export interface ICompanyAdd {
  type: CompanyTypes.COMPANY_SUCCESS_ADD;
  payload: { company: CompanyType };
}

export interface ICompanyUpdate {
  type: CompanyTypes.SUCCESS_UPDATE_COMPANY;
  payload: { company: CompanyType };
}

export interface ICompanyDelete {
  type: CompanyTypes.COMPANY_SUCCESS_DELETE;
  payload: { companyId: string };
}

export interface ICompanyFailure {
  type: CompanyTypes.COMPANY_FAILURE_ACTION;
  payload: { error: string };
}

export interface ICompanyLoading {
  type: CompanyTypes.COMPANY_SET_LOADING;
  payload: { loading: boolean };
}

export type CompanyDispathTypes =
  | ICompanySetCurrent
  | ICompanyAdd
  | ICompanyGetAll
  | ICompanyUpdate
  | ICompanyDelete
  | ICompanyFailure
  | ICompanyLoading;
