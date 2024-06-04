export { default } from "next-auth/middleware";
import { getToken } from 'next-auth/jwt'; 
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // Obtén el token de sesión, suponiendo que estás usando next-auth
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // Define las rutas protegidas
  const protectedRoutes = ['/dashboard', '/game', '/admin'];

  if (protectedRoutes.some((path) => url.pathname.startsWith(path))) {
    // Si el usuario no está autenticado, redirígelo a la página de inicio de sesión
    if (!token) {
      url.pathname = '/sign/login';
      return NextResponse.redirect(url);
    }
  }

  // Si el usuario está autenticado o la ruta no está protegida, continua
  return NextResponse.next();
}

export const config = {
  matcher: ['/','/game/:path*','/admin/:path*'],
};
