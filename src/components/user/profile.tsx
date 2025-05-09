import connectDB from "@/lib/mongoose";
import User from "@/models/User";

import { redirect } from "next/navigation";
import ProfileUpdate from "./profile-update";
import ProfileRead from "./profile-read";
import style from "./profile.module.scss";

export default async function Profile({
  id
}: Readonly<{ id: string | undefined }>) {
  await connectDB();

  const checkedUser = await User.findById(id)
    .select({
      pwd: 0,
      image: 0,
      createdAt: 0
    })
    ?.lean();

  if (!checkedUser) {
    redirect("/auth/signup");
  }

  const safeUser = {
    id: checkedUser._id?.toString(),
    email: checkedUser.email?.toString(),
    userName: checkedUser.userName?.toString(),
    provider: checkedUser.provider?.toString()
  };

  return (
    <article className={style.article}>
      <h1 className={style.title}>
        &quot;{checkedUser.userName}&quot;님의 마이페이지
      </h1>

      {checkedUser.provider === "credentials" ? (
        <ProfileUpdate user={safeUser} />
      ) : (
        <ProfileRead user={safeUser} />
      )}
    </article>
  );
}
