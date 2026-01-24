export interface GetStudentsResponse {
  data: Students[];
}

export interface Students {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  username?: string;
  password?: string;
  documentTypeId?: { id: number; name: string };
  documentNumber?: string;
  description?: string;
  city?: string;
  country?: string;
  institution?: string;
  department?: string;
  phone?: string;
  address?: string;
  status?: string;
  companies: Array<{
    id: number;
    name: string;
  }>;
  areaId?: number;
  positionId?: number;
}

export interface AddStudentsRequest {
  firstname: string;
  lastname: string;
  email: string;
  username?: string;
  password?: string;
  documentTypeId?: { id: number; name: string };
  documentNumber?: string;
  description?: string;
  city?: string;
  country?: string;
  institution?: string;
  department?: string;
  phone?: string;
  address?: string;
  status?: string;
  companies: Array<{
    id: number;
    name: string;
  }>;
  areaId?: number;
  positionId?: number;
}

export interface AddStudentsDataResponse {
  data: {
    firstname: string;
    lastname: string;
    email: string;
    username?: string;
    password?: string;
    documentTypeId?: { id: number; name: string };
    documentNumber?: string;
    description?: string;
    city?: string;
    country?: string;
    institution?: string;
    department?: string;
    phone?: string;
    address?: string;
    status?: string;
    companies: Array<{
      id: number;
      name: string;
    }>;
    areaId?: number;
    positionId?: number;
  };
  isSuccess: boolean;
}

export interface GetStudentsByIdResponse {
  data: Students;
}

export interface GetStudentsByIdRequest {
  studentId: string;
}

export interface UpdateStudentsRequest {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  username?: string;
  password?: string;
  documentTypeId?: { id: number; name: string };
  documentNumber?: string;
  description?: string;
  city?: string;
  country?: string;
  institution?: string;
  department?: string;
  phone?: string;
  address?: string;
  status?: string;
  companies: Array<{
    id: number;
    name: string;
  }>;
  areaId?: number;
  positionId?: number;
}

export interface UpdateStudentsResponse {
  data: {
    firstname: string;
    lastname: string;
    email: string;
    username?: string;
    password?: string;
    documentTypeId?: { id: number; name: string };
    documentNumber?: string;
    description?: string;
    city?: string;
    country?: string;
    institution?: string;
    department?: string;
    phone?: string;
    address?: string;
    status?: string;
    companies: Array<{
      id: number;
      name: string;
    }>;
    areaId?: number;
    positionId?: number;
  };
  isSuccess: boolean;
}

export interface DeleteStudentsRequest {
  id: number;
}

export interface DeleteStudentsResponse {
  isSuccess: boolean;
}
