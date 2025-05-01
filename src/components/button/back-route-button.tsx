"use client";

import { useRouter } from "next/navigation";
import style from "./back-route-button.module.scss";

export default function BackRouteButton() {
  const route = useRouter();

  return (
    <div className={style.btn_container}>
      <button onClick={() => route.back()} className={style.btn}>돌아가기</button>
    </div>
  );
}
