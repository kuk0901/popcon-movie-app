import { MovieListItem } from "@/types/movie";
import style from "./movie-item.module.scss";
import Image from "next/image";
import Link from "next/link";
import { movieReleaseDateToKorDate } from "@/utils/format/stringToDate";

const MovieItem = (props: { movie: MovieListItem }) => {
  const { movieCd, movieNm, openDt, genreAlt, directors } = props.movie;
  const formattedOpenDt = movieReleaseDateToKorDate(openDt);
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
      <Link href={`/movie/${movieCd}`}>
        <Image
          src={"/samplePoster.png"}
          width={80}
          height={105}
          alt="sample-poster"
        />
        <div className={style.info}>
          <div className={style.title}>{movieNm}</div>
          <div className={style.open_date}>개봉일: {formattedOpenDt}</div>
          <div className={style.genre}>장르: {formattedGenreAlt}</div>
          <div className={style.director}>감독: {formattedDirectors}</div>
        </div>
      </Link>
    </li>
  );
};

export default MovieItem;
