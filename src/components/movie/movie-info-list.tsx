import style from "./movie-info-list.module.scss";

interface MovieInfoListProps {
  movieTitle: string;
  ratingGrade: string;
  runtime: string;
  releaseDate: string;
  actorNames: string;
  director: string;
  genres: string;
  companys: string;
  nation: string;
}

export default function MovieInfoList({
  movieTitle,
  ratingGrade,
  runtime,
  releaseDate,
  actorNames,
  director,
  genres,
  companys,
  nation
}: Readonly<MovieInfoListProps>) {
  return (
    <ul className={style.movie_info_list}>
      <li className={`${style.movie_info_item} ${style.movie_info_title}`}>
        {movieTitle}
      </li>
      {ratingGrade !== "" ? (
        <li className={style.movie_info_item}>등급: {ratingGrade}</li>
      ) : null}
      {runtime !== "" ? (
        <li className={style.movie_info_item}>상영시간: {runtime}분</li>
      ) : null}
      <li className={style.movie_info_item}>개봉일: {releaseDate}</li>
      <li className={style.movie_info_item}>배우: {actorNames}</li>
      <li className={style.movie_info_item}>감독: {director}</li>
      <li className={style.movie_info_item}>장르: {genres}</li>
      <li className={style.movie_info_item}>제작: {companys}</li>
      <li className={style.movie_info_item}>국가: {nation}</li>
    </ul>
  );
}
