"use client";

import { registerUserAction } from "@/actions/register-user.action";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import style from "./register.user.module.scss";

export default function RegisterUser() {
  const [state, formAction, isPending] = useActionState(registerUserAction, {
    status: true
  });
  const [showPwd, setShowPwd] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (state?.status && state?.message) {
      alert("회원가입이 완료되었습니다!");
      router.replace("/auth/signin");
    } else if (state && !state.status) {
      alert(state.message);
    }
  }, [state, router]);

  return (
    <form action={formAction} className={style.register_form}>
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

      <div className={style.container}>
        <div className={style.label_container}>
          <label htmlFor="userName">your name</label>
        </div>
        <div className={style.input_container}>
          <input
            id="userName"
            name="userName"
            type="text"
            placeholder="홍길동"
            minLength={2}
            maxLength={20}
            title="이름은 2~20글자 사이이어야 합니다."
            required
          />
        </div>
      </div>

      <div className="btn_container">
        <button disabled={isPending} type="submit" className="btn">
          회원가입
        </button>
      </div>
    </form>
  );
}
