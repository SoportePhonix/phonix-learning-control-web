import { ApiRes } from '@/utils/api-response';
import { fetchWithAuth } from '@/utils/auth-fetch';

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id: instanceId } = await context.params;

  try {
    const response = await fetchWithAuth(`/instance/${instanceId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorResponse = ApiRes.fromExternalResponse({
        message: 'Error deleting instance',
        statusCode: response.status,
      });
      return errorResponse ?? ApiRes.customError(500, 'Error deleting instance');
    }

    return ApiRes.success({ isSuccess: true });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') return ApiRes.customError(401, 'Unauthorized');
    return ApiRes.fromException(error);
  }
}
