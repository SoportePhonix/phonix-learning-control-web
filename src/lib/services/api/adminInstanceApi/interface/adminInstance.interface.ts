export interface AdminInstance {
  userId: number;
  instanceId: number;
  user?: any; // Reemplazar 'any' cuando se conozca la estructura del usuario en esta respuesta
  instance?: any; // Reemplazar 'any' cuando se conozca la estructura de la instancia en esta respuesta
  createdAt?: string;
  updatedAt?: string;
}

export interface GetAdminInstancesResponse {
  data: AdminInstance[];
}

export interface GetAdminInstanceByUserResponse {
  data: AdminInstance[];
}

export interface GetAdminInstanceByInstanceResponse {
  data: AdminInstance[];
}

export interface AddAdminInstanceRequest {
  userId: number;
  instanceId: number;
}

export interface AddAdminInstanceResponse {
  data: AdminInstance;
  message?: string;
}

export interface DeleteAdminInstanceRequest {
  userId: number;
  instanceId: number;
}

export interface DeleteAdminInstanceResponse {
  data: boolean;
  message?: string;
}
