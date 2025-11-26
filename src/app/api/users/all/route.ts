import { authOptions } from '@/lib/auth';
import { CustomSession } from '@/utils/session';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);

    const response = await (
      await fetch(`${process.env.API_URL}/users/all`, {
        headers: {
          authorization: `Bearer ${session?.user?.accessToken}`,
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
    ).json();

    if (response.errors || response.statusCode === 401) {
      throw response;
    }

    const data = response.data;

    return NextResponse.json({
      data,
    });
  } catch (error: unknown) {
    return NextResponse.json(error);
  }
}
