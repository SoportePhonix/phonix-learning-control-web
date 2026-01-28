import { DocumentTypesResponse } from '../../typeOfIdentificationDocumentApi/interface/typeOfIdentificationDocument.interface';

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
  documentType?: { id: number; name: string };
  documentNumber?: string;
  description?: string;
  city?: string;
  country?: string;
  institution?: string;
  department?: string;
  phone?: string;
  address?: string;
  status?: string;
  company?: {
    id: number;
    name: string;
    nit: string;
    email: string;
    status: string;
  };
  area?: {
    id: number;
    name: string;
    description: string;
    status: string;
    companyId: number;
  };
  position?: {
    id: number;
    name: string;
    description: string;
    status: string;
    companyId: number;
  };
  areaId?: number;
  positionId?: number;
}

export interface AddStudentsRequest {
  firstname: string;
  lastname: string;
  email: string;
  username?: string;
  password?: string;
  documentTypeId?: number;
  documentNumber?: string;
  description?: string;
  city?: string;
  country?: string;
  institution?: string;
  department?: string;
  phone?: string;
  address?: string;
  status?: string;
  companyId: number;
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
    documentTypeId?: DocumentTypesResponse;
    documentNumber?: string;
    description?: string;
    city?: string;
    country?: string;
    institution?: string;
    department?: string;
    phone?: string;
    address?: string;
    status?: string;
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
  documentTypeId?: number;
  documentNumber?: string;
  description?: string;
  city?: string;
  country?: string;
  institution?: string;
  department?: string;
  phone?: string;
  address?: string;
  status?: string;
  companyId?: number;
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
    documentTypeId?: DocumentTypesResponse;
    documentNumber?: string;
    description?: string;
    city?: string;
    country?: string;
    institution?: string;
    department?: string;
    phone?: string;
    address?: string;
    status?: string;
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
