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
  documentType?: { id: string; name: string };
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
  companyId: number;
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
  areaId?: number;
  positionId?: number;
}

export interface AddStudentsDataResponse {
  data: {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    username?: string;
    documentNumber?: string;
    description?: string;
    city?: string;
    country?: string;
    institution?: string;
    department?: string;
    phone?: string;
    address?: string;
    status: string;
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
    company: {
      id: number;
      name: string;
      nit: string;
      email: string;
      status: string;
    };
    documentType?: {
      id: string;
      name: string;
    };
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
  companyId: number;
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
  areaId?: number;
  positionId?: number;
}

export interface UpdateStudentsResponse {
  data: {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    username?: string;
    documentNumber?: string;
    description?: string;
    city?: string;
    country?: string;
    institution?: string;
    department?: string;
    phone?: string;
    address?: string;
    status: string;
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
    company: {
      id: number;
      name: string;
      nit: string;
      email: string;
      status: string;
    };
    documentType?: {
      id: string;
      name: string;
    };
  };
  isSuccess: boolean;
}

export interface DeleteStudentsRequest {
  id: number;
}

export interface DeleteStudentsResponse {
  isSuccess: boolean;
}
