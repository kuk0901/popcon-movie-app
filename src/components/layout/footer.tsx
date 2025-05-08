import Link from "next/link";
import style from "./footer.module.scss";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <ul className={style.footer_info}>
        <li className={style.footer_info_item}>Powered by </li>
        <li className={style.footer_info_item}>
          <Link
            href="https://www.kobis.or.kr/kobisopenapi/homepg/main/main.do"
            target="_blank"
            rel="noopener noreferrer"
          >
            영화진흥위원회 오픈 API
          </Link>
        </li>
        <li className={style.footer_info_item}>
          <Link
            href="https://www.kmdb.or.kr/info/api/apiDetail/6"
            target="_blank"
            rel="noopener noreferrer"
          >
            KMDb 오픈 API
          </Link>
        </li>
      </ul>

      <ul className={style.footer_my_info}>
        <li className={style.footer_my_item}>
          © {new Date().getFullYear()} My Portfolio. All rights reserved.
        </li>
      </ul>

      <ul className={style.footer_links}>
        <li className={style.footer_link_item}>
          <Link href="/policy/privacy">개인정보 처리 방침</Link>
        </li>
        <li className={style.footer_link_item}>
          <Link href="/policy/service">사이트 이용 약관</Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
