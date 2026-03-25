import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // Determine if the request is for the admin subdomain
  // This handles localhost (admin.localhost:3000) or production (admin.kiemlua.com)
  const isAdminSubdomain = hostname.startsWith('admin.');

  // Path starts with /admin
  const isPathAdmin = url.pathname.startsWith('/admin');

  // Rule 1: If on the admin subdomain and NOT already on the /admin path, rewrite internally to /admin
  if (isAdminSubdomain && !isPathAdmin) {
    return NextResponse.rewrite(new URL(`/admin${url.pathname === '/' ? '' : url.pathname}`, request.url));
  }

  // Rule 2: Prevent access to /admin via the main domain (e.g., kiemlua.com/admin)
  // If the path asks for /admin but it's not the admin subdomain, return 404 or redirect.
  // We'll redirect to the home page to keep the admin panel isolated and hidden.
  if (!isAdminSubdomain && isPathAdmin) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Auth logic for the Admin Panel
  if (isAdminSubdomain || isPathAdmin) {
    const token = request.cookies.get('admin_token')?.value;

    // Uncomment this logic when real auth is integrated to secure the admin panel
    /*
    if (!token || token !== 'secret_admin_token') {
      // If unauthorized on the admin domain, redirect to a login page (if it exists) 
      // or to the main domain's home page.
      // return NextResponse.redirect(new URL('http://kiemlua.com/', request.url));
    }
    */
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files and api routes
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
