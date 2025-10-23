import { defineMiddleware } from 'astro:middleware';
import { getSession } from './lib/session';

// Define protected routes
const PROTECTED_ROUTES = ['/inbox'];
const AUTH_ROUTES = ['/login'];

export const onRequest = defineMiddleware(async (context, next) => {
  const session = getSession(context.cookies);
  const pathname = context.url.pathname;

  // Add session to locals for easy access in pages
  context.locals.session = session;
  context.locals.user = session?.user || null;

  // Redirect authenticated users away from auth pages
  if (session && AUTH_ROUTES.some(route => pathname.startsWith(route))) {
    return context.redirect('/inbox');
  }

  // Redirect unauthenticated users to login
  if (!session && PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
    return context.redirect('/login');
  }

  return next();
});
