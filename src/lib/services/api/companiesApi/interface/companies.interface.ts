export interface GetCompaniesResponse {
  data: Companies[];
}

export interface Companies {
  id: number;
  name: string;
  nit: string;
  email: string;
  status: string;
}

export interface AddCompaniesRequest {
  name: string;
  nit: string;
  email: string;
  status: string;
}

export interface AddCompaniesDataResponse {
  data: {
    name: string;
    nit: string;
    email: string;
    status: string;
  };
  isSuccess: boolean;
}

export interface GetCompaniesByIdResponse {
  data: Companies;
}

export interface GetCompaniesByIdRequest {
  companyId: string;
}

export interface UpdateCompaniesRequest {
  id: number;
  name: string;
  nit: string;
  email: string;
  status: string;
}

export interface UpdateCompaniesResponse {
  data: {
    name: string;
    nit: string;
    email: string;
    status: string;
  };
  isSuccess: boolean;
}

export interface DeleteCompaniesRequest {
  id: number;
}

export interface DeleteCompaniesResponse {
  isSuccess: boolean;
}
