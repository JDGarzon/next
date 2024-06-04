export { default } from "next-auth/middleware";
import { getToken } from 'next-auth/jwt'; 
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/','/game/:path*','/admin/:path*'],
};
