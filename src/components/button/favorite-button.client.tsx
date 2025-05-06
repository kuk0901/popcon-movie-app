"use client";

import { deleteFavoriteAction } from "@/actions/delete-favorite.action";
import { registerFavoriteAction } from "@/actions/register-favorite.action";
import { FavoriteRegisterInput } from "@/types/favoriteRegisterInput";
import { useState, useTransition } from "react";

export default function FavoriteButtonClient({
  favoriteRegisterInput,
  isFavorite: initialIsFavorite
}: Readonly<{
  favoriteRegisterInput: FavoriteRegisterInput;
  isFavorite: boolean;
}>) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isPending, startTransition] = useTransition();

  console.log(isFavorite);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsFavorite((prev) => !prev); // Optimistic UI

    startTransition(() => {
      const action = isFavorite
        ? deleteFavoriteAction({
            user: favoriteRegisterInput.user,
            movieId: favoriteRegisterInput.movieId
          })
        : registerFavoriteAction(favoriteRegisterInput);

      action.catch(() => setIsFavorite(initialIsFavorite)); // 실패 시 최초 값으로 롤백
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
