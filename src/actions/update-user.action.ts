"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/mongoose";
import User from "@/models/User";
import { UserUpdateSchema } from "@/schemas/UserUpdate.schema";

import { ActionResponse } from "@/types/res/ActionResponse";
import * as bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";

// FIXME: 동작 확인
export async function updateUserAction(
  _: ActionResponse | undefined,
  formData: FormData
): Promise<ActionResponse> {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) throw new Error("Not authenticated");

  console.log("formData: ", formData);

  // FormData 파싱
  const email = formData.get("email")?.toString();
  const pwd = formData.get("pwd")?.toString();
  const userName = formData.get("userName")?.toString();

  // Zod 검증
  const parsed = UserUpdateSchema.safeParse({ email, pwd, userName });
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

    console.log("exists: ", exists);

    // 업데이트할 필드 준비
    const updateFields: Record<string, string> = {
      email: parsed.data.email,
      userName: parsed.data.userName
    };

    // 비밀번호가 입력된 경우에만 해싱해서 포함
    if (parsed.data.pwd) {
      const salt = await bcrypt.genSalt();
      updateFields.pwd = await bcrypt.hash(parsed.data.pwd, salt);
    }

    // 사용자 정보 업데이트
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true }
    );

    console.log("user: ", user);

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
