import type { APIRoute } from 'astro';
import { clearSession } from '../../../lib/session';

export const POST: APIRoute = async ({ cookies }) => {
  clearSession(cookies);

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
