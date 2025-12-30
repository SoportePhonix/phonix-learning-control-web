import { authOptions } from '@/lib/auth';
import { ApiRes } from '@/utils/api-response';
import { CustomSession } from '@/utils/session';
import { getServerSession } from 'next-auth/next';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest, { params }: any) {
  try {
    const body = await new Response(req.body).json();
    const session: CustomSession | null = await getServerSession(authOptions);

    const response = await (
      await fetch(`${process.env.API_URL}/company`, {
        method: 'POST',
        body: JSON.stringify(body),
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
