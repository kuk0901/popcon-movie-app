import connectDB from "@/lib/mongoose";
import Favorite from "@/models/Favorite";
import { getServerSession } from "next-auth";
import FavoriteButtonClient from "./favorite-button.client";
import { FavoriteRegisterInput } from "@/types/favoriteRegisterInput";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function MovieFavoriteButton({
  movieId,
  movieTitle,
  posterURL
}: Readonly<{
  movieId: string;
  movieTitle: string;
  posterURL?: string;
}>) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return null;
  }

  // 1차로 데이터를 가져옴
  await connectDB();

  const favorite = await Favorite.findOne({
    user: session.user.id as string,
    movieId
  });

  const isFavorite = !!favorite;
  const favoriteRegisterInput: FavoriteRegisterInput = {
    user: session.user.id as string,
    movieId,
    movieTitle,
    posterURL
  };

  return (
    <div className="btn_container">
      <FavoriteButtonClient
        favoriteRegisterInput={favoriteRegisterInput}
        isFavorite={isFavorite}
      />
    </div>
  );
}
