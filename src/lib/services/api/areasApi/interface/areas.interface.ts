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
