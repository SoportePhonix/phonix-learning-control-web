import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import type { AuthOptions, NextAuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials, req) {
        if (req.method === 'POST') {
          const { email, password } = credentials as {
            email: string;
            password: string;
          };

          const response = await (
            await fetch(`${process.env.API_ADMIN_URL}/user/login`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email,
                password,
              }),
            })
          ).json();

          if (response.error) {
            throw response;
          }

          if (response.status === 'Error') {
            throw response;
          }

          if (response.status === 401) {
            throw response;
          }

          return {
            accessToken: response.data[0].token,
            token_expires: response.data[0].token_expires,
            token_type: response.data[0].token_type,
            expiresAt: new Date(response.data[0].token_expires).getTime() - 5 * 60 * 1000,
            id: response.data[0].user.id,
            name: response.data[0].user.name,
            last_name: response.data[0].user.last_name,
            document: response.data[0].user.document,
            email: response.data[0].user.email,
            email_verified_at: response.data[0].user.email_verified_at,
            rol: response.data[0].user.rol,
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 235 * 60 * 1000, //NOTE Aca controlamos la expiración del token con el tiempo que tiene el backend actualmente, se debe actualizar si el backend cambia el valor
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken as string;
        token.token_expires = user.token_expires as string;
        token.token_type = user.token_type as string;
        token.expiresAt = user.expiresAt as number;
        token.id = user.id as number;
        token.name = user.name as string;
        token.last_name = user.last_name as string;
        token.document = user.document as string;
        token.email = user.email as string;
        token.email_verified_at = user.email_verified_at as string;
        token.rol = user.rol as string;
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        accessToken: token.accessToken as string,
        token_expires: token.token_expires as string,
        token_type: token.token_type as string,
        expiresAt: token.expiresAt as number,
        id: token.id as number,
        name: token.name as string,
        last_name: token.last_name as string,
        document: token.document as string,
        email: token.email as string,
        email_verified_at: token.email_verified_at as string,
        rol: token.rol as string,
      };
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
} satisfies NextAuthOptions;

export function auth(
  ...args: [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']] | [NextApiRequest, NextApiResponse] | []
) {
  return getServerSession(...args, authOptions);
}
