import ImageSkeleton from "./image-skeleton";
import style from "./skeleton.module.scss";
import TextSkeleton from "./text-skeleton";

export default function MovieDetailSkeleton() {
  return (
    <section className={style.movie_detail}>
      <article className={style.movie_info}>
        <ImageSkeleton />

        <div className={style.movie_info_list}>
          <TextSkeleton />
        </div>
      </article>

      <div className={style.movie_award}>
        <TextSkeleton />
      </div>

      <TextSkeleton />
    </section>
  );
}
