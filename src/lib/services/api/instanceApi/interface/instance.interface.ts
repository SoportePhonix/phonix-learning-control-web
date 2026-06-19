export interface GetInstanceResponse {
  data: Instance[];
}

export interface Instance {
  id: number;
  nit: string;
  name: string;
  description: string;
  status?: string;
}

export interface GetInstanceByIdResponse {
  data: Instance;
}

export interface GetInstanceByIdRequest {
  instanceId: string;
}

export interface AddInstanceRequest {
  nit?: string;
  name: string;
  description: string;
  status?: string;
}

export interface AddInstanceDataResponse {
  data: {
    id: number;
    nit: string;
    name: string;
    description: string;
    status?: string;
  };
  isSuccess: boolean;
}

export interface UpdateInstanceRequest {
  id: number;
  name: string;
  description: string;
  status?: string;
}

export interface UpdateInstanceResponse {
  data: {
    id: number;
    nit: string;
    name: string;
    description: string;
    status?: string;
  };
  isSuccess: boolean;
}

export interface DeleteInstanceRequest {
  id: number;
}

export interface DeleteInstanceResponse {
  isSuccess: boolean;
}
