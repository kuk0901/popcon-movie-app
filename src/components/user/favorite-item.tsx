import { IFavorite } from "@/types/models/Favorite";
import style from "./favorite.module.scss";
import Image from "next/image";
import Link from "next/link";

import ProfileFavoriteRemoveButton from "../button/profile-favorite-remove-button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function FavoriteItem({
  favorite
}: Readonly<{ favorite: IFavorite }>) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return null;
  }

  return (
    <article className={`profile_favorite ${style.movie_article}`}>
      <Link
        href={`/movie/${favorite.movieId}/${favorite.movieSeq}`}
        className={style.movie_page_link}
      >
        <h3 className={style.movie_title}>{favorite.movieTitle}</h3>

        <Image
          src={favorite.posterURL as string}
          width={230}
          height={300}
          alt={`${favorite.movieTitle}의 포스터 이미지`}
          className={style.movie_poster}
        />
      </Link>

      <ProfileFavoriteRemoveButton
        docId={favorite.docId}
        user={session.user.id as string}
      />
    </article>
  );
}
