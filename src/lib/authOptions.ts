import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import connectDB from "@/lib/mongoose";
import User from "@/models/User";
import * as bcrypt from "bcryptjs";
import { UserLoginSchema } from "@/schemas/UserLogin.schema";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        pwd: { label: "password", type: "password" }
      },
      async authorize(credentials) {
        const parsed = UserLoginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        try {
          await connectDB();

          // 유저 확인
          const user = await User.findOne({ email: parsed.data.email });
          if (!user) return null;

          // 비밀번호 확인
          if (user.pwd) {
            const isMatch = await bcrypt.compare(parsed.data.pwd, user.pwd);

            if (!isMatch) return null;
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.userName,
            image: typeof user.image === "string" ? user.image : undefined
          };
        } catch (err) {
          console.error(err);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/auth/signin"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.image = typeof user.image === "string" ? user.image : undefined;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      if (session.user && typeof token.image === "string") {
        session.user.image = token.image;
      }
      return session;
    }
  }
};
