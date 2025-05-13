"use client";

import { usePolicyLinkActive } from "@/hooks/usePolicyLinkActive";
import style from "./policy-nav.module.scss";
import Link from "next/link";

export default function PolicyNav() {
  return (
    <nav className={style.policy_nav}>
      <ul className={style.policy_link_list}>
        <li className={style.policy_link_item}>
          <Link
            href="/policy/service"
            className={
              usePolicyLinkActive("/policy/service")
                ? `${style.policy_link} ${style.active}`
                : style.policy_link
            }
          >
            이용약관
          </Link>
        </li>
        <li className={style.policy_link_item}>
          <Link
            href="/policy/privacy"
            className={
              usePolicyLinkActive("/policy/privacy")
                ? `${style.policy_link} ${style.active}`
                : style.policy_link
            }
          >
            개인정보처리방침
          </Link>
        </li>
      </ul>
    </nav>
  );
}
