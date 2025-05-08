import SigninUser from "@/components/auth/signin-user";
import style from "../page.module.scss";
import Image from "next/image";

export default function Page() {
  return (
    <section className={style.section}>
      <Image
        src={"/auth.webp"}
        alt="로그인 이미지"
        width={400}
        height={500}
        priority
      />
      <SigninUser />
    </section>
  );
}
