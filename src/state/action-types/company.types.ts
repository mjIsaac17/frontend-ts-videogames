/** Company key types */
export enum CompanyTypes {
  SUCCESS_GET_COMPANIES = "SUCCESS_GET_COMPANIES",
  COMPANY_FAILURE_ACTION = "COMPANY_FAILURE_ACTION",
}

/** Company Types */
export type CompanyType = {
  id: string;
  name: string;
  description: string;
  image: Buffer;
  imageType: string;
};

/** State */
export interface CompanyState {
  companies: CompanyType[];
  loading: boolean;
  error?: string;
}

/** Interfaces */
export interface ICompanyGetAll {
  type: CompanyTypes.SUCCESS_GET_COMPANIES;
  payload: { companies: CompanyType[] };
}

export interface ICompanyFailure {
  type: CompanyTypes.COMPANY_FAILURE_ACTION;
  payload: { error: string };
}

export type CompanyDispathTypes = ICompanyGetAll | ICompanyFailure;
