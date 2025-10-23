import type { APIRoute } from 'astro';
import { getSession } from '../../../lib/session';

export const GET: APIRoute = async ({ cookies }) => {
  const session = getSession(cookies);

  if (!session) {
    return new Response(JSON.stringify({ authenticated: false }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({
    authenticated: true,
    user: session.user,
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
