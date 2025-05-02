import connectDB from "@/lib/mongoose";
import { UserLoginSchema } from "@/schemas/UserLogin.schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const parsed = UserLoginSchema.safeParse(data);

    if (!parsed.success) {
      return NextResponse.json(
        { errors: parsed.error.errors },
        { status: 400 }
      );
    }

    await connectDB();

    // FIXME: 로그인 처리 로직 작성
  } catch (error) {
    console.error("로그인 에러:", error);

    return NextResponse.json(
      { message: "로그인에 실패했습니다." },
      { status: 500 }
    );
  }
}
