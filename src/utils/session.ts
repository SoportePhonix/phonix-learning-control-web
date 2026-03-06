export type CustomSession = Session;

export interface CustomToken {
  accessToken: string;
  expiresAt: number;
  id: number;
  name: string;
  lastName: string;
  email: string;
  status: string;
  identificationDocument?: string;
  companyId?: number;
  role: Array<{
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }>;
  companies: Array<any>;
}

export interface Session {
  user: {
    id: string;
    name: string;
    email: string;
    accessToken: string;
    lastName: string;
    expiresAt: string;
    status: string;
    identificationDocument?: string;
    companyId?: number;
    role: Array<{
      id: number;
      name: string;
      createdAt: string;
      updatedAt: string;
      deletedAt: string | null;
    }>;
    companies: Array<any>;
  };
  expires: string;
  data: Record<string, unknown>;
  status: 'authenticated' | 'unauthenticated';
  update: () => Promise<void>;
}
