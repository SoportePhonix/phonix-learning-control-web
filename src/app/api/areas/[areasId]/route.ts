import { authOptions } from '@/lib/auth';
import { ApiRes } from '@/utils/api-response';
import { CustomSession } from '@/utils/session';
import { getServerSession } from 'next-auth/next';

export async function GET(req: Request, context: { params: Promise<{ areasId: string }> }) {
  const { areasId } = await context.params;

  try {
    const session: CustomSession | null = await getServerSession(authOptions);

    if (!session?.user?.accessToken) {
      return ApiRes.fromException(new Error('Unauthorized'));
    }

    const response = await (
      await fetch(`${process.env.API_URL}/areas/${areasId}`, {
        headers: {
          authorization: `Bearer ${session.user.accessToken}`,
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
    ).json();

    const errorResponse = ApiRes.fromExternalResponse(response);
    if (errorResponse) return errorResponse;

    return ApiRes.success(response.data);
  } catch (error: unknown) {
    return ApiRes.fromException(error);
  }
}
