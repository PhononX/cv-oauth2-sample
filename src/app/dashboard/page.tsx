'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { REDIRECT_URI } from '@/constants';

export default function Dashboard() {
  const router = useRouter();
  const [tokenInfo, setTokenInfo] = useState<any>(null);
  const [refreshTokenInfo, setRefreshTokenInfo] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    // Check if we have an access token
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      router.push('/');
    }
  }, [router]);

  const getNewAccessToken = async () => {
    try {
      const response = await fetch('/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          grant_type: 'authorization_code',
          code: localStorage.getItem('auth_code'),
          redirect_uri: REDIRECT_URI,
        }),
      });
      const data = await response.json();
      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        if (data.refresh_token) {
          localStorage.setItem('refresh_token', data.refresh_token);
        }
      }
      setTokenInfo(data);
    } catch (error) {
      console.error('Error getting access token:', error);
    }
  };

  const getRefreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        console.error('No refresh token available');
        return;
      }

      const response = await fetch('/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        }),
      });
      const data = await response.json();
      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        if (data.refresh_token) {
          localStorage.setItem('refresh_token', data.refresh_token);
        }
      }
      setRefreshTokenInfo(data);
    } catch (error) {
      console.error('Error getting refresh token:', error);
    }
  };

  const getUserInfo = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        console.error('No access token available');
        return;
      }

      const response = await fetch('/api/whoami', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      setUserInfo(data);
    } catch (error) {
      console.error('Error getting user info:', error);
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Dashboard</h1>
        
        <div className="space-y-6">
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={getNewAccessToken}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
            >
              Get New Access Token
            </button>

            <button
              onClick={getRefreshToken}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium shadow-sm"
            >
              Get Refresh Token
            </button>

            <button
              onClick={getUserInfo}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium shadow-sm"
            >
              User Info
            </button>
          </div>

          {tokenInfo && (
            <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Access Token Info:</h2>
              <pre className="whitespace-pre-wrap bg-white p-4 rounded border border-gray-200 text-gray-800 font-mono text-sm">{JSON.stringify(tokenInfo, null, 2)}</pre>
            </div>
          )}

          {refreshTokenInfo && (
            <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Refresh Token Info:</h2>
              <pre className="whitespace-pre-wrap bg-white p-4 rounded border border-gray-200 text-gray-800 font-mono text-sm">{JSON.stringify(refreshTokenInfo, null, 2)}</pre>
            </div>
          )}

          {userInfo && (
            <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">User Info:</h2>
              <pre className="whitespace-pre-wrap bg-white p-4 rounded border border-gray-200 text-gray-800 font-mono text-sm">{JSON.stringify(userInfo, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 