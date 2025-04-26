"use client";

import { usePolicyLinkActive } from "@/hooks/usePolicyLinkActive";
import style from "./policy-nav.module.scss";
import Link from "next/link";

export default function PolicyNav() {
  return (
    <nav className={style.policy_nav}>
      <div className={style.policy_link_list}>
        <div className={style.policy_link}>
          <Link
            href="/policy/service"
            className={
              usePolicyLinkActive("/policy/service") ? style.active : ""
            }
          >
            이용약관
          </Link>
        </div>
        <div className={style.policy_link}>
          <Link
            href="/policy/privacy"
            className={
              usePolicyLinkActive("/policy/privacy") ? style.active : ""
            }
          >
            개인정보처리방침
          </Link>
        </div>
      </div>
    </nav>
  );
}
