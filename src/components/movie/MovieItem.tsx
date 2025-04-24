import { MovieListItem } from "@/types/movie";
import style from "./movie-item.module.scss";

const MovieItem = (props: { movie: MovieListItem }) => {
  const { movieNm, openDt, genreAlt, directors } = props.movie;
  const formattedOpenDt = openDt
    ? `${openDt.slice(0, 4)}년 ${openDt.slice(4, 6)}월 ${openDt.slice(6, 8)}일`
    : "정보 없음";
  const formattedGenreAlt = genreAlt
    ? genreAlt.replace(/,/g, ", ")
    : "정보 없음";
  const formattedDirectors =
    directors.length > 0
      ? directors
          .map((director) => director.peopleNm)
          .join(", ")
          .replace(/,/g, ", ")
      : "정보 없음";

  return (
    <li className={style.list_item}>
      <div className={style.title}>제목: {movieNm}</div>
      <div className={style.open_date}>개봉일: {formattedOpenDt}</div>
      <div className={style.genre}>장르: {formattedGenreAlt}</div>
      <div className={style.director}>감독: {formattedDirectors}</div>
    </li>
  );
};

export default MovieItem;
