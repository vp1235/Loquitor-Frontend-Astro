import type { APIRoute } from 'astro';
import { getSession } from '../../../lib/session';

const BACKEND_BASE = import.meta.env.PUBLIC_BACKEND_URL || 'http://localhost:8000';

export const GET: APIRoute = async ({ cookies }) => {
  const session = getSession(cookies);

  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const response = await fetch(`${BACKEND_BASE}/auth/gmail/messages`, {
      headers: {
        'Authorization': `Bearer ${session.token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify(data), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Inbox fetch error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch messages' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
