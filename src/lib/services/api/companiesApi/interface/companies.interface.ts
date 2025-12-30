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
