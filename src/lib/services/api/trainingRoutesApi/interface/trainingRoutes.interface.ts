export interface TrainingRoute {
  id: number;
  name: string;
  description?: string;
  companyId: number;
  areaId?: number;
  positionId?: number;
  companyName?: string;
  areaName?: string;
  positionName?: string;
}

export interface GetTrainingRoutesResponse {
  data: TrainingRoute[];
}

export interface GetTrainingRouteByIdResponse {
  data: TrainingRoute;
}

export interface GetTrainingRouteByIdRequest {
  id: string;
}

export interface GetTrainingRoutesByCompanyRequest {
  companyId: string;
}

export interface AddTrainingRouteRequest {
  name: string;
  description?: string;
  companyId: number;
  areaId?: number;
  positionId?: number;
}

export interface AddTrainingRouteResponse {
  data: TrainingRoute;
  isSuccess: boolean;
}

export interface UpdateTrainingRouteRequest {
  id: number;
  name: string;
  description?: string;
  areaId?: number;
  positionId?: number;
}

export interface UpdateTrainingRouteResponse {
  data: TrainingRoute;
  isSuccess: boolean;
}

export interface DeleteTrainingRouteRequest {
  id: number;
}

export interface DeleteTrainingRouteResponse {
  isSuccess: boolean;
}
