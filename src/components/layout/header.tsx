"use client";

import Link from "next/link";
import style from "./header.module.scss";
import { useSession } from "next-auth/react";
import UserInfo from "../user/user-info";

const Header = () => {
  const session = useSession();
  const { data } = session;

  return (
    <header className={style.header}>
      <div className={style.logo}>
        <Link href={"/"} className={style.link_home}>
          <span className={style.logo_img}></span>
          <span className={style.logo_text}>Popcon Movie</span>
        </Link>
      </div>
      {data?.user ? (
        <UserInfo user={data.user} />
      ) : (
        <div className={style.link_container}>
          <Link href={"/auth/signin"} className={style.link_auth}>
            로그인
          </Link>
          <Link href={"/auth/signup"} className={style.link_auth}>
            회원가입
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
