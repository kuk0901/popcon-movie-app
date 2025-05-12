import style from "./movie-awards.module.scss";

export default function MovieAwards({
  awards
}: Readonly<{ awards: string[] }>) {
  return (
    <>
      {awards.length > 1 && (
        <article className={style.movie_award}>
          <div className={style.award_title}>수상 내역</div>
          <ul className={style.award_list}>
            {awards.map((award, i) => (
              <li key={i} className={style.award_item}>
                {award}
              </li>
            ))}
          </ul>
        </article>
      )}
    </>
  );
}
