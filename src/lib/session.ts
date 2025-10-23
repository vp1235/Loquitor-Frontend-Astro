import type { AstroCookies } from 'astro';

export interface User {
  email: string;
  name?: string;
  given_name?: string;
  picture?: string;
}

export interface Session {
  user: User;
  token: string;
}

const SESSION_COOKIE = 'loquitor_session';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function setSession(cookies: AstroCookies, session: Session) {
  cookies.set(SESSION_COOKIE, JSON.stringify(session), {
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: 'lax',
    maxAge: MAX_AGE,
    path: '/',
  });
}

export function getSession(cookies: AstroCookies): Session | null {
  const sessionCookie = cookies.get(SESSION_COOKIE);
  if (!sessionCookie) return null;

  try {
    return JSON.parse(sessionCookie.value);
  } catch {
    return null;
  }
}

export function clearSession(cookies: AstroCookies) {
  cookies.delete(SESSION_COOKIE, { path: '/' });
}
