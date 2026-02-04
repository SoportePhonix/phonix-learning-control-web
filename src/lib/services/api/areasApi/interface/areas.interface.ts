export interface GetAreasResponse {
  data: Areas[];
}

export interface Areas {
  id: number;
  name: string;
  description: string;
  status?: string;
  companyId: number;
  companyName: string;
}

export interface GetAreasByIdResponse {
  data: Areas;
}

export interface GetAreasByIdRequest {
  areaId: string;
}

export interface AddAreasRequest {
  name: string;
  description: string;
  companyId: number;
  status?: string;
}

export interface AddAreasDataResponse {
  data: {
    name: string;
    description: string;
    status: string;
    companyId: number;
  };
  isSuccess: boolean;
}

export interface UpdateAreasRequest {
  id: number;
  name: string;
  description: string;
  status: string;
  companyId: number;
}

export interface UpdateAreasResponse {
  data: {
    name: string;
    description: string;
    status: string;
    companyId: number;
  };
  isSuccess: boolean;
}

export interface DeleteAreasRequest {
  id: number;
}

export interface DeleteAreasResponse {
  isSuccess: boolean;
}
