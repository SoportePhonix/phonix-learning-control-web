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

export interface GetPositionsByIdResponse {
  data: Positions;
}

export interface GetPositionsByIdRequest {
  positionId: string;
}
