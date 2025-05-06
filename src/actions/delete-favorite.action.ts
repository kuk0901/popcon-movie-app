"use server";

import connectDB from "@/lib/mongoose";
import Favorite from "@/models/Favorite";
import { FavoriteDeleteSchema } from "@/schemas/FavoriteDelete.schema";
import { ActionResponse } from "@/types/res/ActionResponse";
import { Types } from "mongoose";

export async function deleteFavoriteAction({
  user,
  movieId
}: {
  user: string;
  movieId: string;
}): Promise<ActionResponse> {
  const parsed = FavoriteDeleteSchema.safeParse({ user, movieId });

  if (!parsed.success) {
    return {
      status: false,
      error: parsed.error.errors.map((e) => e.message).join(", ")
    };
  }

  try {
    await connectDB();

    const deleteFavorite = await Favorite.deleteOne({
      user: new Types.ObjectId(parsed.data.user),
      movieId: parsed.data.movieId
    });

    return deleteFavorite.deletedCount === 1
      ? {
          status: true,
          message: `해당 작품이 찜 목록에서 삭제되었습니다.`
        }
      : { status: false, message: "찜 데이터가 존재하지 않습니다." };
  } catch (err) {
    console.error("찜 목록 삭제 에러: ", err);

    if (err instanceof Error) {
      return { status: false, message: err.message };
    }

    return { status: false, message: String(err) };
  }
}
