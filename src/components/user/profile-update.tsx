"use client";

import style from "./profile.module.scss";
import { useActionState, useEffect, useState } from "react";
import { updateUserAction } from "@/actions/update-user.action";
import { useRouter } from "next/navigation";
import { UserProfile } from "@/types/userProfile";

export default function ProfileUpdate({
  user
}: Readonly<{ user: UserProfile }>) {
  const [state, formAction, isPending] = useActionState(updateUserAction, {
    status: true
  });
  const [email, setEmail] = useState(user.email);
  const [userName, setUserName] = useState(user.userName);
  const [showPwd, setShowPwd] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (state?.status && state?.message) {
      console.log("state success: ", state);
      alert("회원 정보가 저장되었습니다. 다시 로그인 해주세요.");
      router.replace("/auth/signin");
    } else if (state && !state.status) {
      console.log("state failed: ", state);
      alert(state.message);
    }
  }, [state, router]);

  return (
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>

      <div className="btn_container">
        <button disabled={isPending} type="submit" className="btn">
          저장
        </button>
      </div>
    </form>
  );
}
