"use client";

import { UserInfo as UserInfoType } from "@/types/userInfo";
import style from "./user-info.module.scss";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function UserInfo({ user }: Readonly<{ user: UserInfoType }>) {
  const [showMenu, setShowMenu] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!showMenu) return;

    function handleClickOutside(e: MouseEvent) {
      if (
        sectionRef.current &&
        !sectionRef.current.contains(e.target as Node)
      ) {
        setShowMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  return (
    <section className={style.section} ref={sectionRef}>
      <div className={style.user_info}>
        {user.image ? (
          <Image
            src={user.image}
            alt="사용자 아이콘"
            width={40}
            height={40}
            className={style.user_icon}
            onClick={() => setShowMenu((prev) => !prev)}
          />
        ) : (
          <Image
            src="/user.svg"
            alt="사용자 아이콘"
            width={40}
            height={40}
            className={style.user_icon}
          />
        )}
      </div>

      {showMenu && (
        <nav aria-label="사용자 메뉴" className={style.nav}>
          <ul className={style.nav_list}>
            <li className={style.nav_item}>
              <Link
                href="/profile"
                className={style.nav_link}
                onClick={() => setShowMenu(false)}
              >
                마이페이지
              </Link>
            </li>
            <li className={style.nav_item}>
              <button
                onClick={async () => {
                  setShowMenu(false);
                  await signOut({ callbackUrl: "/?loggedout=1" });
                }}
                className={style.nav_link}
              >
                로그아웃
              </button>
            </li>
          </ul>
        </nav>
      )}
    </section>
  );
}
