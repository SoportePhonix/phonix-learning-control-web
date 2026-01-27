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

export interface AddAreasRequest {
  name: string;
  description: string;
  status?: string;
  companyId: number;
}

export interface AddAreasDataResponse {
  data: {
    name: string;
    description: string;
    status?: string;
  };
  isSuccess: boolean;
}

export interface GetAreasByIdResponse {
  data: Areas;
}

export interface GetAreasByIdRequest {
  areaId: string;
}

export interface UpdateAreasRequest {
  name: string;
  description: string;
  status?: string;
  companyId: number;
}

export interface UpdateAreasResponse {
  data: {
    name: string;
    description: string;
    status?: string;
  };
  isSuccess: boolean;
}

export interface DeleteAreasRequest {
  id: number;
}

export interface DeleteAreasResponse {
  isSuccess: boolean;
}
