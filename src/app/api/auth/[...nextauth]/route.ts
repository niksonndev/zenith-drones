import NextAuth from 'next-auth';

const handler = NextAuth({
  providers: [
    // Adicione providers em .env (ex: AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET)
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
  },
});

export { handler as GET, handler as POST };
