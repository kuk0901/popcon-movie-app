import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Profile from "@/components/user/profile";
import FavoriteList from "@/components/user/favorite-list";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/auth/signin");
  }

  return (
    <section>
      <Profile id={session.user.id} />
      <FavoriteList user={session.user.id} />
    </section>
  );
}
