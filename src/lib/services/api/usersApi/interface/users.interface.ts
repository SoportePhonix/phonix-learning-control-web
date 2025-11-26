export interface GetUsersResponse {
  data: {
    status: string;
    message: string;
    data: Array<{
      [key: string]: {
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
      };
    }>;
  };
}
