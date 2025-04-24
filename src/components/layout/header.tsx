import Link from "next/link";
import style from "./header.module.scss";

const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.logo}>
        <Link href={"/"} className={style.link_home}>
          Popcon Movie
        </Link>
      </div>
      <div className={style.link_container}>
        <Link href={"/auth/signin"} className={style.link_auth}>
          로그인
        </Link>
        <Link href={"/auth/signup"} className={style.link_auth}>
          회원가입
        </Link>
      </div>
    </header>
  );
};

export default Header;
