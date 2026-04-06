import { ApiRes } from '@/utils/api-response';
import { fetchWithAuth } from '@/utils/auth-fetch';

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  try {
    const body = await req.json();

    if (body.nit && typeof body.nit === 'string' && body.nit.includes(' ')) {
      return ApiRes.customError(
        400,
        'El NIT no debe contener espacios. Si deseas separar palabras, puedes usar guiones (-).',
        'INVALID_NIT_FORMAT'
      );
    }

    const { nit, ...bodyWithoutNit } = body;

    const response = await fetchWithAuth(`/instance/${id}`, {
      method: 'PATCH',
      body: bodyWithoutNit,
    });

    const data = await response.json();

    const errorResponse = ApiRes.fromExternalResponse(data);
    if (errorResponse) return errorResponse;

    return ApiRes.success(data?.data ?? data);
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') return ApiRes.customError(401, 'Unauthorized');
    return ApiRes.fromException(error);
  }
}
