import { authOptions } from '@/lib/auth';
import { ApiRes } from '@/utils/api-response';
import { CustomSession } from '@/utils/session';
import { getServerSession } from 'next-auth/next';

interface RouteContext {
  params: Promise<{ studentId: string }>;
}

export async function GET(_req: Request, { params }: RouteContext) {
  try {
    const { studentId } = await params;
    const session: CustomSession | null = await getServerSession(authOptions);
    const accessToken = session?.user?.accessToken;

    if (!accessToken) {
      return ApiRes.customError(401, 'Unauthorized');
    }

    const fetchResponse = await fetch(`${process.env.API_URL}/enrollment/student/${studentId}`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${accessToken}`,
        accept: 'application/json',
      },
    });

    let response: Record<string, unknown> = {};
    try {
      response = (await fetchResponse.json()) as Record<string, unknown>;
    } catch {
      response = {};
    }

    if (!fetchResponse.ok) {
      const errorResponse = ApiRes.fromExternalResponse({
        ...response,
        statusCode: typeof response.statusCode === 'number' ? response.statusCode : fetchResponse.status,
      });

      return errorResponse ?? ApiRes.customError(fetchResponse.status, 'Error fetching student enrollments');
    }

    const errorResponse = ApiRes.fromExternalResponse(response);
    if (errorResponse) return errorResponse;

    return ApiRes.success(response.data);
  } catch (error: unknown) {
    return ApiRes.fromException(error);
  }
}
