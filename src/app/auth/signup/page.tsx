import RegisterUser from "@/components/auth/register-user";
import style from "../page.module.scss";
import Image from "next/image";

export default function Page() {
  return (
    <section className={style.section}>
      <Image
        src={"/auth.webp"}
        alt="회원가입 이미지"
        width={400}
        height={500}
        priority
      />
      <RegisterUser />
    </section>
  );
}
