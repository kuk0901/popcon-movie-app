"use server";

import { authOptions } from "@/lib/authOptions";
import connectDB from "@/lib/mongoose";
import User from "@/models/User";
import { UserUpdateSchema } from "@/schemas/UserUpdate.schema";

import { ActionResponse } from "@/types/res/ActionResponse";
import * as bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";

export async function updateUserAction(
  _: ActionResponse | undefined,
  formData: FormData
): Promise<ActionResponse> {
  console.log("서버 액션 에러 확인 중 1");
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) throw new Error("Not authenticated");

  console.log("formData: ", formData);

  // FormData 파싱
  const email = formData.get("email")?.toString();
  const pwdRaw = formData.get("pwd");
  const pwd = pwdRaw === "" ? undefined : pwdRaw?.toString();
  const userName = formData.get("userName")?.toString();

  // Zod 검증
  const parsed = UserUpdateSchema.safeParse({
    id: userId,
    email,
    pwd,
    userName
  });

  if (!parsed.success) {
    return {
      status: false,
      error: parsed.error.errors.map((e) => e.message).join(", ")
    };
  }

  try {
    await connectDB();

    // 나를 제외한 이메일 중복 확인
    const exists = await User.findOne({
      email: parsed.data.email,
      _id: { $ne: userId }
    });

    if (exists) {
      return { status: false, message: "이미 가입된 이메일입니다." };
    }

    // 업데이트할 필드 준비
    const updateFields: Record<string, string> = {
      email: parsed.data.email,
      userName: parsed.data.userName
    };

    // 비밀번호 유무에 따라 다르게 동작해야 함, 없는 경우 기존 비밀번호 사용
    if (parsed.data.pwd) {
      // 사용자 정보 업데이트
      const salt = await bcrypt.genSalt();
      updateFields.pwd = await bcrypt.hash(parsed.data.pwd, salt);
    }

    // 사용자 정보 업데이트
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true }
    );

    return user
      ? { status: true, message: "회원 정보가 저장되었습니다." }
      : { status: false, message: "DB 저장 실패" };
  } catch (err) {
    console.error("회원가입 에러: ", err);

    if (err instanceof Error) {
      return { status: false, message: err.message };
    }

    return { status: false, message: String(err) };
  }
}
