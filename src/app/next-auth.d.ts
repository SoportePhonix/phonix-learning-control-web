import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      accessToken: string;
      expiresAt: number;
      id: number;
      name: string;
      lastName: string;
      identificationDocument: string;
      email: string;
      companyId: number;
      role: Array<{
        id: number;
        name: string;
      }>;
    } & DefaultSession['user'];
  }

  interface JWT {
    accessToken: string;
    expiresAt: number;
    id: number;
    name: string;
    lastName: string;
    identificationDocument: string;
    email: string;
    companyId: number;
    role: Array<{
      id: number;
      name: string;
    }>;
  }

  interface User {
    accessToken: string;
    expiresAt: number;
    id: number;
    name: string;
    lastName: string;
    identificationDocument: string;
    email: string;
    companyId: number;
    role: { id: number; name: string }[];
  }
}
