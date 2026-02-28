import { authOptions } from '@/lib/auth';
import { ApiRes } from '@/utils/api-response';
import { CustomSession } from '@/utils/session';
import { getServerSession } from 'next-auth/next';

export async function DELETE(req: Request, { params }: any) {
  const { nit: instanceNit } = await params;

  try {
    const session: CustomSession | null = await getServerSession(authOptions);

    if (!session?.user?.accessToken) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }
    const response = await fetch(`${process.env.API_URL}/instance/${instanceNit}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${session.user.accessToken}`,
        accept: 'application/json',
      },
    });

    if (!response.ok) {
      const errorResponse = ApiRes.fromExternalResponse({
        message: 'Error deleting instance',
        statusCode: response.status,
      });

      return errorResponse ?? ApiRes.customError(500, 'Error deleting instance');
    }

    return ApiRes.success({ isSuccess: true });
  } catch (error: unknown) {
    return ApiRes.fromException(error);
  }
}
