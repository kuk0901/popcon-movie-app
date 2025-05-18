import MovieListSkeleton from "./movie-list-skeleton";
import TextSkeleton from "./text-skeleton";
import style from "./skeleton.module.scss";
import TitleSkeleton from "./title-skeleton";

export default function ProfileSkeleton() {
  return (
    <section className={style.profile}>
      <TitleSkeleton />

      <ul className={style.profile_list}>
        {Array.from({ length: 3 }).map((_, idx) => (
          <li key={idx} className={style.profile_item}>
            <TextSkeleton />
          </li>
        ))}
      </ul>

      <MovieListSkeleton count={3} />
    </section>
  );
}
