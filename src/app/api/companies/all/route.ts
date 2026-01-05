import { authOptions } from '@/lib/auth';
import { ApiRes } from '@/utils/api-response';
import { CustomSession } from '@/utils/session';
import { getServerSession } from 'next-auth/next';

export async function GET() {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);

    console.log('SESSION:', session);
    console.log('TOKEN:', session?.user?.accessToken);

    const response = await fetch(`${process.env.API_URL}/companies`, {
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
        Accept: 'application/json',
      },
    }).then((res) => res.json());

    const errorResponse = ApiRes.fromExternalResponse(response);
    if (errorResponse) return errorResponse;

    console.log('EMPRESAS', response.data);
    return ApiRes.success(response.data);
  } catch (error: unknown) {
    return ApiRes.fromException(error);
  }
}
