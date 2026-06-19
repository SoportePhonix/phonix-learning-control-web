export interface GetLmsResponse {
  data: Lms[];
}

export interface Lms {
  id: number;
  name: string;
  type: string;
  url: string;
  token: string;
  status?: string;
  lmsIdExternal: string;
  companyIds: number[];
}

export interface GetLmsByIdResponse {
  data: Lms;
}

export interface GetLmsByIdRequest {
  lmsId: string;
}

export interface AddLmsRequest {
  name: string;
  type: string;
  url: string;
  token: string;
  status?: string;
  lmsIdExternal?: string;
  companyIds: number[];
}

export interface AddLmsDataResponse {
  data: {
    name: string;
    type: string;
    url: string;
    token: string;
    status?: string;
    lmsIdExternal: string;
    companyIds: number[];
  };
  isSuccess: boolean;
}

export interface UpdateLmsRequest {
  id: number;
  name: string;
  type: string;
  url: string;
  token?: string;
  status?: string;
  lmsIdExternal?: string;
  companyIds?: number[];
}

export interface UpdateLmsResponse {
  data: {
    name: string;
    type: string;
    url: string;
    token: string;
    status?: string;
    lmsIdExternal: string;
    companyIds: number[];
  };
  isSuccess: boolean;
}

export interface DeleteLmsRequest {
  id: number;
}

export interface DeleteLmsResponse {
  isSuccess: boolean;
}
