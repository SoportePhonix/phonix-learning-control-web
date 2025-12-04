import { authOptions } from '@/lib/auth';
import { ApiRes } from '@/utils/api-response';
import { CustomSession } from '@/utils/session';
import { getServerSession } from 'next-auth/next';

export async function GET() {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);

    const response = await (
      await fetch(`${process.env.API_URL}/users/all`, {
        headers: {
          authorization: `Bearer ${session?.user?.accessToken}`,
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
    ).json();

    // Verifica si hay error en la respuesta externa
    const errorResponse = ApiRes.fromExternalResponse(response);
    if (errorResponse) return errorResponse;

    return ApiRes.success(response.data);
  } catch (error: unknown) {
    return ApiRes.fromException(error);
  }
}
