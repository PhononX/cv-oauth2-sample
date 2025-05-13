import { NextResponse } from 'next/server';
import { BASE_URL } from '@/constants';

export async function GET(request: Request) {
  try {
    const accessToken = request.headers.get('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return NextResponse.json({ error: 'No access token provided' }, { status: 401 });
    }

    const response = await fetch(`${BASE_URL}/whoami`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in whoami route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 