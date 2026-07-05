import type { NextAuthConfig } from "next-auth";

// Edge-safe config: no database or bcrypt imports here.
// The Credentials provider (which needs Prisma + bcrypt) lives in auth.ts,
// which only runs in the Node.js runtime. Middleware imports this file only.
export const authConfig: NextAuthConfig = {
  // Required when running behind the standalone Node server / a reverse proxy
  // (e.g. PM2 + Nginx) rather than Vercel — Auth.js v5 does not trust the
  // incoming Host header by default in that setup, which otherwise causes
  // every auth request to fail with "UntrustedHost".
  trustHost: true,
  providers: [],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminRoute = nextUrl.pathname.startsWith("/admin");
      const isLoginPage = nextUrl.pathname === "/admin/login";

      if (isAdminRoute && !isLoginPage && !isLoggedIn) {
        return Response.redirect(new URL("/admin/login", nextUrl));
      }

      if (isLoginPage && isLoggedIn) {
        return Response.redirect(new URL("/admin", nextUrl));
      }

      return true;
    },
  },
};
