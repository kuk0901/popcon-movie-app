import SigninUser from "@/components/auth/signin-user";
import style from "../page.module.scss";
import Image from "next/image";
import ToastRenderer from "@/components/toast/toast-render";
import ToastOnSignout from "@/components/toast/toast-on-signout";

export default function Page() {
  return (
    <>
      <section className={style.section}>
        <Image
          src={"/auth.webp"}
          alt="로그인 이미지"
          width={400}
          height={500}
          priority
          className={style.img}
        />
        <SigninUser />
      </section>

      <ToastRenderer ids={["signup", "userUpdate"]} />
      <ToastOnSignout />
    </>
  );
}
