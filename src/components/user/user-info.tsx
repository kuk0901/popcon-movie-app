import { UserInfo as UserInfoType } from "@/types/userInfo";
import style from "./user-info.module.scss";
import Image from "next/image";

export default function UserInfo({ user }: Readonly<{ user: UserInfoType }>) {
  return (
    <div className={style.user_info}>
      {user.image ? (
        <Image
          src={user.image}
          alt="사용자 아이콘"
          width={40}
          height={40}
          className={style.user_icon}
        />
      ) : (
        <Image
          src="/user.svg"
          alt="사용자 아이콘"
          width={40}
          height={40}
          className={style.user_icon}
        />
      )}
    </div>
  );
}
