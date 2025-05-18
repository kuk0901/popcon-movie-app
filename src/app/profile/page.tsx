import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import Profile from "@/components/user/profile";
import FavoriteList from "@/components/user/favorite-list";
import ToastRenderer from "@/components/toast/toast-render";
import { Suspense } from "react";
import ProfileSkeleton from "@/components/skeletons/profile-skeleton";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/auth/signin");
  }

  return (
    <>
      <ToastRenderer ids={["favorite"]} />

      <section>
        <Suspense fallback={<ProfileSkeleton />}>
          <Profile id={session.user.id} />
          <FavoriteList user={session.user.id} />
        </Suspense>
      </section>
    </>
  );
}
