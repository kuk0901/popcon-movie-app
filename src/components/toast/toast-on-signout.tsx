"use client";

import { useToastStore } from "@/stores/useToastStore";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ToastOnSignout() {
  const searchParams = useSearchParams();
  const { addToast } = useToastStore();

  useEffect(() => {
    if (searchParams.get("loggedout")) {
      addToast("signout", "로그아웃되었습니다.", "success");
    } else if (searchParams.get("ut")) {
      addToast(
        "userUpdate",
        "회원 정보가 저장되었습니다. 다시 로그인 해주세요.",
        "success"
      );
    }
  }, [searchParams, addToast]);

  return null;
}
