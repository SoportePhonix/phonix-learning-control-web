import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  if (req.method === 'POST') {
    try {
      const session = await getServerSession(authOptions);
      const response = await (
        await fetch(`${process.env.API_ADMIN_URL}/user/logout`, {
          method: 'POST',
          headers: {
            authorization: `Bearer ${session?.user.accessToken}`,
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
      ).json();

      if (response.error || response.statusCode === 401) {
        throw response;
      }

      return NextResponse.json(response);
    } catch (error: unknown) {
      return NextResponse.json(error);
    }
  }
}
