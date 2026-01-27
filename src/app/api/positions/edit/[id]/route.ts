import { authOptions } from '@/lib/auth';
import { ApiRes } from '@/utils/api-response';
import { CustomSession } from '@/utils/session';
import { getServerSession } from 'next-auth/next';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: positionsId } = await params;

  try {
    const body = await req.json();
    const session: CustomSession | null = await getServerSession(authOptions);

    if (!session?.user?.accessToken) {
      return ApiRes.customError(401, 'Unauthorized');
    }

    const response = await fetch(`${process.env.API_URL}/positions/${positionsId}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        authorization: `Bearer ${session.user.accessToken}`,
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    const errorResponse = ApiRes.fromExternalResponse(data);
    if (errorResponse) return errorResponse;

    return ApiRes.success(data.data);
  } catch (error: unknown) {
    return ApiRes.fromException(error);
  }
}
