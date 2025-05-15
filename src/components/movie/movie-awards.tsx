import style from "./movie-awards.module.scss";

// FIXME: 뒷 부분이 : 로만 끝나는 경우가 존재함
// -> ex) 인셉션(영화) 로저 이버트 Roger Ebert TOP 10(2010) :
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
