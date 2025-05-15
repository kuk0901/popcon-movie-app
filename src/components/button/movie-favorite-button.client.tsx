"use client";

import { deleteFavoriteAction } from "@/actions/delete-favorite.action";
import { registerFavoriteAction } from "@/actions/register-favorite.action";
import { useToastStore } from "@/stores/useToastStore";
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
  const { addToast } = useToastStore();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsFavorite((prev) => !prev); // Optimistic UI

    startTransition(() => {
      if (isFavorite) {
        deleteFavoriteAction({
          user: favoriteRegisterInput.user,
          docId: favoriteRegisterInput.docId
        })
          .then(() => addToast("favorite", "찜이 취소되었습니다.", "success"))
          .catch(() => setIsFavorite(initialIsFavorite));
      } else {
        registerFavoriteAction(favoriteRegisterInput)
          .then(() => addToast("favorite", "찜에 추가되었습니다.", "success"))
          .catch(() => setIsFavorite(initialIsFavorite));
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
