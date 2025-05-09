"use client";

import { useRouter } from "next/navigation";

export default function BackRouteButton() {
  const route = useRouter();

  return (
    <div className="btn_container">
      <button onClick={() => route.back()} className="btn">
        돌아가기
      </button>
    </div>
  );
}
