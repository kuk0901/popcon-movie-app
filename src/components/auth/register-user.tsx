"use client";

import { registerUserAction } from "@/actions/register-user.action";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import style from "./auth-user.module.scss";
import { useToastStore } from "@/stores/useToastStore";
import { toast } from "react-toastify";

export default function RegisterUser() {
  const [state, formAction, isPending] = useActionState(registerUserAction, {
    status: false
  });
  const [showPwd, setShowPwd] = useState(false);
  const router = useRouter();
  const { addToast } = useToastStore();
  const toasts = useToastStore((state) => state.toasts["signup"]);

  useEffect(() => {
    if (state.status) {
      addToast("signup", "회원가입되었습니다.", "success");
      router.replace("/auth/signin");
    } else if (state.status === false && toasts?.message) {
      toast.error(
        "회원가입 중 서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
      );
    }
  }, [state]);

  return (
    <div className={style.form_container}>
      <h2 className={style.title}>Popcon Movie 회원가입</h2>

      <form action={formAction} className={style.form}>
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
    </div>
  );
}
