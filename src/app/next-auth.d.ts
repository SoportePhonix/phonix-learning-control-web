import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      accessToken: string;
      token_expires: string;
      token_type: string;
      expiresAt: number;

      id: number;
      name: string;
      last_name: string;
      document: string;
      email: string;
      email_verified_at: string;
      rol: string;
    } & DefaultSession['user'];
  }

  interface JWT {
    accessToken: string;
    token_expires: string;
    token_type: string;
    expiresAt: number;

    id: number;
    name: string;
    last_name: string;
    document: string;
    email: string;
    email_verified_at: string;
    rol: string;
  }

  interface User {
    accessToken: string;
    token_expires: string;
    token_type: string;
    expiresAt: number;

    id: number;
    name: string;
    last_name: string;
    document: string;
    email: string;
    email_verified_at: string;
    rol: string;
  }
}
