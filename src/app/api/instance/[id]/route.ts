import { ApiRes } from '@/utils/api-response';
import { fetchWithAuth } from '@/utils/auth-fetch';

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  try {
    const response = await (await fetchWithAuth(`/instance/${id}`)).json();

    const errorResponse = ApiRes.fromExternalResponse(response);
    if (errorResponse) return errorResponse;

    return ApiRes.success(response?.data ?? response);
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') return ApiRes.customError(401, 'Unauthorized');
    return ApiRes.fromException(error);
  }
}
