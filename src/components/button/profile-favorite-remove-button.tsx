"use client";

import { deleteFavoriteAction } from "@/actions/delete-favorite.action";
import { useRouter } from "next/navigation";

export default function ProfileFavoriteRemoveButton({
  user,
  docId
}: Readonly<{
  user: string;
  docId: string;
}>) {
  const router = useRouter();

  const handleRemove = async () => {
    await deleteFavoriteAction({ user, docId });
    router.refresh(); // 삭제 후 목록 최신화
  };

  return (
    <div className="btn_container">
      <button className="btn btn__remove" onClick={handleRemove}>찜 취소</button>
    </div>
  );
}
