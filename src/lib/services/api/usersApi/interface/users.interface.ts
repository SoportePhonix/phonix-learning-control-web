export interface GetUsersResponse {
  data: {
    status: string;
    message: string;
    data: User[];
  };
}

export interface User {
  name: string;
  lastName: string;
  typeOfIdentificationDocument: {
    id: number;
    name: string;
  };
  identificationDocument: string;
  password: string;
  email: string;
  role: Array<{
    id: number;
    name: string;
  }>;
}
