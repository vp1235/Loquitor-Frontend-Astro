import type { APIRoute } from 'astro';
import { getSession } from '../../../lib/session';

const BACKEND_BASE = import.meta.env.PUBLIC_BACKEND_URL || 'http://localhost:8000';

export const POST: APIRoute = async ({ request, cookies }) => {
  const session = getSession(cookies);

  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();

    const response = await fetch(`${BACKEND_BASE}/rag/generate_reply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.token}`,
      },
      body: JSON.stringify(body),
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
    console.error('Generate reply error:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate reply' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
