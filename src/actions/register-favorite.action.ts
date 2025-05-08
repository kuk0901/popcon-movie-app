"use server";

import connectDB from "@/lib/mongoose";
import Favorite from "@/models/Favorite";
import { FavoriteRegisterSchema } from "@/schemas/FavoriteRegister.schema";
import { FavoriteRegisterInput } from "@/types/favoriteRegisterInput";
import { ActionResponse } from "@/types/res/ActionResponse";
import mongoose from "mongoose";

export async function registerFavoriteAction(
  input: FavoriteRegisterInput
): Promise<ActionResponse> {
  const parsed = FavoriteRegisterSchema.safeParse(input);

  if (!parsed.success) {
    return {
      status: false,
      error: parsed.error.errors.map((e) => e.message).join(", ")
    };
  }

  try {
    await connectDB();

    // 찜 추가
    const save = await Favorite.create({
      ...parsed.data,
      user: new mongoose.Types.ObjectId(input.user)
    });

    return save
      ? {
          status: true,
          message: `${input.movieTitle} 작품이 찜 목록에 추가되었습니다.`
        }
      : { status: false, message: "DB 저장 실패" };
  } catch (err) {
    console.error("찜 목록 추가 에러: ", err);

    if (err instanceof Error) {
      return { status: false, message: err.message };
    }

    return { status: false, message: String(err) };
  }
}
