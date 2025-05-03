import RegisterUser from "@/components/auth/register-user";
import style from "./page.module.scss";

export default function Page() {
  return (
    <>
      <h2 className={style.title}>Popcon Movie 회원가입</h2>
      <section className={style.register_section}>
        <RegisterUser />
      </section>
    </>
  );
}
