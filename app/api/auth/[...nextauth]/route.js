import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { connectToDB } from "@/database/Connect-database";
import User from "@/schema/register-schema";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { password, email } = credentials || {};
        try {
          await connectToDB();
          const user = await User.findOne({ email });
          if (!user) {
            return null;
          }
          const hashPassword = await bcrypt.compare(password, user.password);
          if (!hashPassword) {
            return null;
          }

          return {
            id: user._id,
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.log("[Credential_Login_Error:]", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        (token.id = user.id),
          (token.name = user.name),
          (token.email = user.email);
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user.id = token.id),
          (session.user.name = token.name),
          (session.user.email = token.email);
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
