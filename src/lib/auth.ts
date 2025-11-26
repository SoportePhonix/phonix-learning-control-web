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
            await fetch(`${process.env.API_URL}/auth/login`, {
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
            id: response.data.user.id,
            name: response.data.user.name,
            lastName: response.data.user.lastName,
            identificationDocument: response.data.user.identificationDocument,
            email: response.data.user.email,
            companyId: response.data.user.companyId,
            role: response.data.user.role,
            accessToken: response.data.token,
            expiresAt: new Date(response.data.token_expires).getTime(),
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
        token.accessToken = user.accessToken;
        token.expiresAt = user.expiresAt;
        token.id = user.id;
        token.name = user.name;
        token.lastName = user.lastName;
        token.identificationDocument = user.identificationDocument;
        token.email = user.email;
        token.companyId = user.companyId;
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...session.user,
        accessToken: String(token.accessToken),
        expiresAt: Number(token.expiresAt),
        id: Number(token.id),
        name: String(token.name),
        lastName: String(token.lastName),
        identificationDocument: String(token.identificationDocument),
        email: String(token.email),
        companyId: Number(token.companyId),
        role: token.role as { id: number; name: string }[],
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
