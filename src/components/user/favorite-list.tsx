import connectDB from "@/lib/mongoose";
import FavoriteItem from "./favorite-item";
import style from "./favorite.module.scss";
import Favorite from "@/models/Favorite";

export default async function FavoriteList({
  user
}: Readonly<{ user: string | undefined }>) {
  await connectDB();

  const favoriteList = await Favorite.find({ user: user });

  return (
    <article className={style.article}>
      <h1 className={style.title}>찜 목록</h1>

      <section className={style.favorite_section}>
        {favoriteList.length == 0 ? (
          <div className={style.none_favorite}>찜 목록이 비어있습니다.</div>
        ) : (
          favoriteList.map((favorite) => (
            <FavoriteItem key={favorite.id} favorite={favorite} />
          ))
        )}
      </section>
    </article>
  );
}
