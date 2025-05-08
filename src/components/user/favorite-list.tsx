import FavoriteItem from "./favorite-item";
import style from "./favorite.module.scss";

export default function FavoriteList() {
  return (
    <section className={style.section}>
      <FavoriteItem />
    </section>
  );
}
