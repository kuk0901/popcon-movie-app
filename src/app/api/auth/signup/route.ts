import connectDB from "@/lib/mongoose";
import { UserRegisterSchema } from "@/schemas/userRegister.schema";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const parsed = UserRegisterSchema.safeParse(data);

    if (!parsed.success) {
      return NextResponse.json(
        { errors: parsed.error.errors },
        { status: 400 }
      );
    }

    await connectDB();

    // 중복 검사
    const exists = await User.findOne({ email: parsed.data.email });

    if (exists) {
      return NextResponse.json(
        { message: "이미 가입된 이메일입니다." },
        { status: 409 }
      );
    }

    // 비밀번호 암호화
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(parsed.data.pwd, salt);
    parsed.data.pwd = hashedPassword;

    // 이미 검증된 데이터만 사용
    const user = await User.create(parsed.data);

    if (!user) {
      throw new Error("DB 저장 실패");
    }

    return NextResponse.json(
      { message: "회원가입 되었습니다." },
      { status: 201 }
    );
  } catch (error) {
    console.error("회원가입 에러:", error);

    return NextResponse.json(
      { message: "회원가입에 실패했습니다." },
      { status: 500 }
    );
  }
}
