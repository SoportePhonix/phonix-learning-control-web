import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      accessToken: string;
      expiresAt: number;
      id: number;
      name: string;
      lastName: string;
      email: string;
      status: string;
      instanceId?: number;
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
    } & DefaultSession['user'];
  }

  interface JWT {
    accessToken: string;
    expiresAt: number;
    id: number;
    name: string;
    lastName: string;
    email: string;
    status: string;
    instanceId?: number;
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

  interface User {
    accessToken: string;
    expiresAt: number;
    id: number;
    name: string;
    lastName: string;
    email: string;
    status: string;
    instanceId?: number;
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
}
