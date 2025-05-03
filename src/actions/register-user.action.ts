"use server";

import connectDB from "@/lib/mongoose";
import User from "@/models/User";
import { UserRegisterSchema } from "@/schemas/userRegister.schema";
import { ActionResponse } from "@/types/res/ActionResponse";
import * as bcrypt from "bcryptjs";


export async function registerUserAction(
  _: ActionResponse | undefined,
  formData: FormData
): Promise<ActionResponse> {
  // FormData 파싱
  const email = formData.get("email")?.toString();
  const pwd = formData.get("pwd")?.toString();
  const userName = formData.get("userName")?.toString();

  // Zod 검증
  const parsed = UserRegisterSchema.safeParse({ email, pwd, userName });
  if (!parsed.success) {
    return {
      status: false,
      error: parsed.error.errors.map((e) => e.message).join(", ")
    };
  }

  try {
    await connectDB(); // DB 연결

    // 중복 이메일 체크
    const exists = await User.findOne({ email: parsed.data.email });
    if (exists) {
      return { status: false, message: "이미 가입된 이메일입니다." };
    }

    // 비밀번호 암호화
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(parsed.data.pwd, salt);

    // 사용자 생성
    const user = await User.create({
      ...parsed.data,
      pwd: hashedPassword
    });

    return user
      ? { status: true, message: "회원가입 되었습니다." }
      : { status: false, message: "DB 저장 실패" };
  } catch (err) {
    console.error("회원가입 에러:", err);

    if (err instanceof Error) {
      return { status: false, message: err.message };
    }

    return { status: false, message: String(err) };
  }
}
