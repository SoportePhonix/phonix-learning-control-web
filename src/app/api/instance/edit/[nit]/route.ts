import { authOptions } from '@/lib/auth';
import { ApiRes } from '@/utils/api-response';
import { CustomSession } from '@/utils/session';
import { getServerSession } from 'next-auth/next';

export async function PATCH(req: Request, { params }: { params: Promise<{ nit: string }> }) {
  const { nit: instanceNit } = await params;

  try {
    const body = await req.json();

    if (body.nit && typeof body.nit === 'string' && body.nit.includes(' ')) {
      return ApiRes.customError(
        400,
        'El NIT no debe contener espacios. Si deseas separar palabras, puedes usar guiones (-).',
        'INVALID_NIT_FORMAT'
      );
    }

    const session: CustomSession | null = await getServerSession(authOptions);

    if (!session?.user?.accessToken) {
      return ApiRes.customError(401, 'Unauthorized');
    }

    const { nit, ...bodyWithoutNit } = body;

    const url = `${process.env.API_URL}/instance/${instanceNit}`;

    const response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(bodyWithoutNit),
      headers: {
        authorization: `Bearer ${session.user.accessToken}`,
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    const errorResponse = ApiRes.fromExternalResponse(data);
    if (errorResponse) {
      return errorResponse;
    }

    return ApiRes.success(data.data);
  } catch (error: unknown) {
    return ApiRes.fromException(error);
  }
}
