/** Company key types */
export enum CompanyTypes {
  SUCCESS_GET_COMPANY = "SUCCESS_GET_COMPANY",
  SUCCESS_GET_COMPANIES = "SUCCESS_GET_COMPANIES",
  COMPANY_FAILURE_ACTION = "COMPANY_FAILURE_ACTION",
  COMPANY_SET_LOADING = "COMPANY_SET_LOADING",
}

/** Company Types */
export type CompanyType = {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  image: Buffer;
  imageType: string;
};

/** State */
export interface CompanyState {
  companies: CompanyType[];
  currentCompany?: CompanyType;
  currentPage?: number;
  loading: boolean;
  totalCompanies?: number;
  totalPages?: number;
  error?: string;
}

/** Interfaces */
export interface ICompanyGet {
  type: CompanyTypes.SUCCESS_GET_COMPANY;
  payload: { company: CompanyType };
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

export interface ICompanyFailure {
  type: CompanyTypes.COMPANY_FAILURE_ACTION;
  payload: { error: string };
}

export interface ICompanyLoading {
  type: CompanyTypes.COMPANY_SET_LOADING;
  payload: { loading: boolean };
}

export type CompanyDispathTypes =
  | ICompanyGet
  | ICompanyGetAll
  | ICompanyFailure
  | ICompanyLoading;
