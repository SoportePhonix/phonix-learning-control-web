import { RolesResponse } from '../../rolesApi/interface';
import { DocumentTypesResponse } from '../../typeOfIdentificationDocumentApi/interface/typeOfIdentificationDocument.interface';

export interface GetUsersResponse {
  data: User[];
}

export interface User {
  name: string;
  lastName: string;
  typeOfIdentificationDocument: {
    id: number; //Clave valor
    name: string;
  };
  identificationDocument: string;
  password: string;
  email: string;
  role: Array<{
    //Array
    id: number /* Esta es la posición 0 del array, tanto id como name */;
    name: string;
  }>;
}

export interface AddUserRequest {
  name: string;
  lastName: string;
  typeOfIdentificationDocument: number;
  identificationDocument: string;
  password: string;
  email: string;
  role: [
    {
      id: number;
    },
  ];
}

export interface AddUserDataResponse {
  data: {
    name: string;
    lastName: string;
    typeOfIdentificationDocument: DocumentTypesResponse;
    identificationDocument: string;
    password: string;
    email: string;
    role: RolesResponse[];
  };
  isSuccess: boolean;
}

export interface GetUserByIdResponse {
  data: User;
}

export interface UpdateUserRequest {
  name: string;
  lastName: string;
  typeOfIdentificationDocument: number;
  identificationDocument: string;
  email: string;
  role: [
    {
      id: number;
    },
  ];
}

export interface UpdateUserResponse {
  data: {
    name: string;
    lastName: string;
    typeOfIdentificationDocument: DocumentTypesResponse;
    identificationDocument: string;
    email: string;
    role: RolesResponse[];
  };
  isSuccess: boolean;
}
