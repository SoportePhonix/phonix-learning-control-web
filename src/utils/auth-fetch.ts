import { authOptions } from '@/lib/auth';
import { ApiRes } from '@/utils/api-response';
import { CustomSession } from '@/utils/session';
import { getServerSession } from 'next-auth/next';

interface AuthFetchOptions extends RequestInit {
  body?: any;
}

export async function fetchWithAuth(urlPath: string, options: AuthFetchOptions = {}) {
  const session: CustomSession | null = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    throw new Error('UNAUTHORIZED');
  }

  const { body, ...restOptions } = options;

  const response = await fetch(`${process.env.API_URL}${urlPath}`, {
    ...restOptions,
    ...(body ? { body: JSON.stringify(body) } : {}),
    headers: {
      ...restOptions.headers,
      authorization: `Bearer ${session.user.accessToken}`,
      accept: 'application/json',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
  });

  return response;
}
