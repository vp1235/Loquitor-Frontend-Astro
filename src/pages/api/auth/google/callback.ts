import type { APIRoute } from 'astro';
import { setSession } from '../../../../lib/session';

const BACKEND_BASE = import.meta.env.PUBLIC_BACKEND_URL || 'http://localhost:8000';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return new Response(JSON.stringify({ error: 'Missing authorization code' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Exchange code with backend
    const response = await fetch(`${BACKEND_BASE}/auth/google/callback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({ error: data.detail || 'Authentication failed' }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!data.access_token || !data.user) {
      return new Response(JSON.stringify({ error: 'Invalid response from server' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Set session cookie
    setSession(cookies, {
      user: data.user,
      token: data.access_token,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Auth callback error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
