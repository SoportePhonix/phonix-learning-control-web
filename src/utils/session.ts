export type CustomSession = Session;
export interface Session {
  user: {
    id: string;
    name: string;
    email: string;
    accessToken: string;
    last_name: string;
    expiresAt: string;
  };
  expires: string;
  data: Record<string, unknown>;
  status: 'authenticated' | 'unauthenticated';
  update: () => Promise<void>;
}
