import ImageSkeleton from "./image-skeleton";
import style from "./skeleton.module.scss";
import TextSkeleton from "./text-skeleton";
import TitleSkeleton from "./title-skeleton";

export default function MovieListSkeleton() {
  return (
    <article className={style.movies_skeleton}>
      <TitleSkeleton />

      <ul className={style.movie_list}>
        {Array.from({ length: 10 }).map((_, idx) => (
          <li key={idx} className={style.movie_item}>
            <ImageSkeleton />
            <TextSkeleton />
          </li>
        ))}
      </ul>
    </article>
  );
}
