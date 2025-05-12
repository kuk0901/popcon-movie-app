import style from "./profile.module.scss";
import { UserProfile } from "@/types/userProfile";

export default function ProfileRead({ user }: Readonly<{ user: UserProfile }>) {
  return (
    <form className={style.form}>
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
            value={user.email}
            readOnly
          />
        </div>
      </div>

      <div className={`${style.container} ${style.container_read}`}>
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
            value={user.userName}
            readOnly
          />
        </div>
      </div>
    </form>
  );
}
