"use client";

import style from "./profile.module.scss";
import { useActionState, useEffect, useState } from "react";
import { updateUserAction } from "@/actions/update-user.action";
import { UserProfile } from "@/types/userProfile";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";
import { useToastStore } from "@/stores/useToastStore";

export default function ProfileUpdate({
  user
}: Readonly<{ user: UserProfile }>) {
  const [state, formAction, isPending] = useActionState(updateUserAction, {
    status: false
  });
  const [email, setEmail] = useState(user.email);
  const [userName, setUserName] = useState(user.userName);
  const [showPwd, setShowPwd] = useState(false);
  const toasts = useToastStore((state) => state.toasts["userUpdate"]);

  useEffect(() => {
    if (state.status) {
      signOut({ callbackUrl: "/auth/signin?ut=1" });
    } else if (state.status === false && toasts?.message) {
      toast.error(
        "회원 정보 저장 중 서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
      );
    }
  }, [state]);

  const handleActionFrom = async (formData: FormData) => {
    if (
      formData.get("email") === user.email &&
      formData.get("userName") === user.userName &&
      !formData.get("pwd")
    ) {
      toast.info("변경된 내용이 없습니다.");
      return;
    }

    formAction(formData);
  };

  return (
    <form action={handleActionFrom} className={style.form}>
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
