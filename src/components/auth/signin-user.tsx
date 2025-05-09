"use client";

import { signIn } from "next-auth/react";
import style from "./auth-user.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SigninUser() {
  const [showPwd, setShowPwd] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString();
    const pwd = formData.get("pwd")?.toString();

    const res = await signIn("credentials", {
      email,
      pwd,
      redirect: false
    });

    if (res?.status == 200) {
      router.replace("/");
    }

    // 에러 메시지 띄움
  };

  return (
    <div className={style.form_container}>
      <h2 className={style.title}>Popcon Movie 로그인</h2>

      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.container}>
          <div className={style.label_container}>
            <label htmlFor="email">email</label>
          </div>
          <div className={style.input_container}>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="popcon@gmail.com"
              minLength={5}
              maxLength={50}
              title="이메일은 5~50글자 사이이어야 합니다."
              required
              autoComplete="username"
            />
          </div>
        </div>

        <div className={style.container}>
          <div className={style.label_container}>
            <label htmlFor="pwd">password</label>
          </div>
          <div className={`${style.input_container} ${style.pwd_container}`}>
            <input
              id="pwd"
              name="pwd"
              type={showPwd ? "text" : "password"}
              placeholder="********"
              pattern="^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$"
              title="비밀번호는 영어와 숫자를 포함해야 합니다."
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPwd((v) => !v)}
              className={style.show_pwd}
            >
              {showPwd ? "숨기기" : "보기"}
            </button>
          </div>
        </div>

        <div className="btn_container">
          <button type="submit" className="btn">
            로그인
          </button>
        </div>
      </form>
    </div>
  );
}
