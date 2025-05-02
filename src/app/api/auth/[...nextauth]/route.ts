import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { z } from "zod";

// 여기서만 사용될 거라 분리 안 해도 될 듯
const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

// FIXME: DB 저장 코드 작성해야 함, signIn() 사용
export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // 입력값 검증
        const parsed = LoginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        // DB에서 유저 찾고, 비밀번호 비교 등 로그인 로직 작성
        // const user = await User.findOne({ email: parsed.data.email });
        // if (!user) return null;
        // const isMatch = await bcrypt.compare(parsed.data.password, user.pwd);
        // if (!isMatch) return null;
        // return user;

        return null;
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/auth/signin"
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
