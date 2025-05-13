import { NextResponse } from 'next/server';
import { CLIENT_ID, BASE_URL } from '@/constants';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { grant_type, code, redirect_uri, refresh_token } = body;

    const tokenEndpoint = `${BASE_URL}/oauth/token`;

    const formData = new URLSearchParams();
    formData.append('grant_type', grant_type);
    formData.append('client_id', CLIENT_ID);

    if (grant_type === 'authorization_code') {
      formData.append('code', code);
      formData.append('redirect_uri', redirect_uri);
    } else if (grant_type === 'refresh_token') {
      formData.append('refresh_token', refresh_token);
    }

    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in token route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 