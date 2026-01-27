export interface GetPositionsResponse {
  data: Positions[];
}

export interface Positions {
  id: number;
  name: string;
  description: string;
  status?: string;
  companyId: number;
  companyName: string;
}

export interface AddPositionsRequest {
  name: string;
  description: string;
  status?: string;
  companyId: number;
}

export interface AddPositionsDataResponse {
  data: {
    name: string;
    description: string;
    status?: string;
    companyId: number;
  };
  isSuccess: boolean;
}

export interface GetPositionsByIdResponse {
  data: Positions;
}

export interface GetPositionsByIdRequest {
  positionId: string;
}

export interface UpdatePositionsRequest {
  name: string;
  description: string;
  status?: string;
  companyId: number;
}

export interface UpdatePositionsResponse {
  data: {
    name: string;
    description: string;
    status?: string;
  };
  isSuccess: boolean;
}

export interface DeletePositionsRequest {
  id: number;
}

export interface DeletePositionsResponse {
  isSuccess: boolean;
}
