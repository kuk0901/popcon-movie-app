"use client";

import { deleteFavoriteAction } from "@/actions/delete-favorite.action";
import { registerFavoriteAction } from "@/actions/register-favorite.action";
import { FavoriteRegisterInput } from "@/types/favoriteRegisterInput";
import { useTransition } from "react";

export default function FavoriteButtonClient({
  favoriteRegisterInput,
  isFavorite
}: Readonly<{
  favoriteRegisterInput: FavoriteRegisterInput;
  isFavorite: boolean;
}>) {
  const [isPending, startTransition] = useTransition();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    startTransition(() => {
      if (isFavorite) {
        deleteFavoriteAction({
          user: favoriteRegisterInput.user,
          movieId: favoriteRegisterInput.movieId
        });
      } else {
        registerFavoriteAction(favoriteRegisterInput);
      }
    });
  };

  function getButtonText() {
    if (isPending) return "처리 중...";
    if (isFavorite) return "찜 취소";
    return "찜하기";
  }

  return (
    <button
      disabled={isPending}
      onClick={handleClick}
      className="btn btn--favorite"
    >
      {getButtonText()}
    </button>
  );
}
