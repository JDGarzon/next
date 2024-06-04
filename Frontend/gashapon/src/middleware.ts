export { default } from "next-auth/middleware";

import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  if (url.pathname === '/') {
    url.pathname = '/sign/login';
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: '/',
};
