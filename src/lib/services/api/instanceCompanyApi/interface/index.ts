export interface InstanceCompany {
  instanceId: number | string;
  companyId: number | string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateInstanceCompanyRequest {
  instanceId: number | string;
  companyId: number | string;
}

export interface CreateInstanceCompanyResponse {
  success: boolean;
  message?: string;
  data: InstanceCompany;
}

export interface GetAllInstanceCompanyResponse {
  success: boolean;
  data: InstanceCompany[];
}

export interface GetCompaniesByInstanceRequest {
  instanceId: number | string;
}

export interface GetCompaniesByInstanceResponse {
  success: boolean;
  data: InstanceCompany[];
}

export interface GetInstancesByCompanyRequest {
  companyId: number | string;
}

export interface GetInstancesByCompanyResponse {
  success: boolean;
  data: InstanceCompany[];
}

export interface DeleteInstanceCompanyRequest {
  instanceId: number | string;
  companyId: number | string;
}

export interface DeleteInstanceCompanyResponse {
  success: boolean;
  message?: string;
}
