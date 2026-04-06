export interface GetInstanceResponse {
  data: Instance[];
}

export interface Instance {
  id?: number;
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
  nit: string;
  name: string;
  description: string;
  status?: string;
}

export interface AddInstanceDataResponse {
  data: {
    nit: string;
    name: string;
    description: string;
    status?: string;
  };
  isSuccess: boolean;
}

export interface UpdateInstanceRequest {
  id: string;
  nit: string;
  name: string;
  description: string;
  status?: string;
}

export interface UpdateInstanceResponse {
  data: {
    nit: string;
    name: string;
    description: string;
    status?: string;
  };
  isSuccess: boolean;
}

export interface DeleteInstanceRequest {
  id: string;
}

export interface DeleteInstanceResponse {
  isSuccess: boolean;
}
