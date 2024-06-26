import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions ={
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          username: { label: "username", type: "text", placeholder: "Ingresar nombre de usuario" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
            {
              method: "POST",
              body: JSON.stringify({
                username: credentials?.username,
                password: credentials?.password,
              }),
              headers: { "Content-Type": "application/json" },
            }
          );
          const user = await res.json();
          console.log(user);
  
          if (user.error) throw user;
  
          return user;
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user }) {
        return { ...token, ...user };
      },
      async session({ session, token }) {
        session.user = token as any;
        return session;
      },
    },
    pages: {
      signIn: "/login",
    },
  };