import { authOptions } from '@/lib/auth';
import { ApiRes } from '@/utils/api-response';
import { CustomSession } from '@/utils/session';
import { getServerSession } from 'next-auth/next';

export async function DELETE(req: Request, { params }: any) {
  const { userId, instanceId } = await params;
  try {
    const session: CustomSession | null = await getServerSession(authOptions);

    const response = await (
      await fetch(`${process.env.API_URL}/admin-instance/${userId}/${instanceId}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${session?.user?.accessToken}`,
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
