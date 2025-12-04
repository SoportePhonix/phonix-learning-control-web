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
