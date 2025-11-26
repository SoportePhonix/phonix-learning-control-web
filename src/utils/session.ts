export type CustomSession = Session;

export interface CustomToken {
  accessToken: string;
  expiresAt: number;
  id: number;
  name: string;
  lastName: string;
  identificationDocument: string;
  email: string;
  companyId: string;
  role: string;
}

export interface Session {
  user: {
    id: string;
    name: string;
    email: string;
    accessToken: string;
    lastName: string;
    expiresAt: string;
  };
  expires: string;
  data: Record<string, unknown>;
  status: 'authenticated' | 'unauthenticated';
  update: () => Promise<void>;
}
