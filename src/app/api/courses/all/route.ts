import { authOptions } from '@/lib/auth';
import { ApiRes } from '@/utils/api-response';
import { CustomSession } from '@/utils/session';
import { getServerSession } from 'next-auth/next';

export async function GET() {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);

    const response = await fetch(`${process.env.API_URL}/courses`, {
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
        Accept: 'application/json',
      },
    }).then((res) => res.json());

    const errorResponse = ApiRes.fromExternalResponse(response);
    if (errorResponse) return errorResponse;

    return ApiRes.success(response.data);
  } catch (error: unknown) {
    return ApiRes.fromException(error);
  }
}
