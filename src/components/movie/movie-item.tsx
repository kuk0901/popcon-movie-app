import { MovieAndPosterDetail } from "@/types/movie";
import { movieReleaseDateToKorDate } from "@/utils/format/stringToDate";
import style from "./movie-item.module.scss";
import Link from "next/link";
import MoviePoster from "./movie-poster";

export interface RatingType {
  ratingDate: string;
  ratingGrade: string;
  releaseDate: string;
}

export default function MovieItem({
  movie
}: Readonly<{ movie: MovieAndPosterDetail }>) {
  const rating: RatingType = movie?.ratings.rating[0];
  const releaseDate = movieReleaseDateToKorDate(rating.releaseDate);
  const posterUrl: string[] = movie?.posters.split("|");
  const movieTitle = movie?.title?.replace(/!HS|!HE/g, "");
  const ratingGrade = rating.ratingGrade.split("||")[0];

  return (
    <li className={style.movies_item}>
      <Link href={`/movie/${movie.movieId}/${movie.movieSeq}`}>
        <div className={style.movie_poster}>
          <MoviePoster posterUrl={posterUrl[0]} movieTitle={movieTitle} />
        </div>

        <ul className={style.movie_info_list}>
          <li className={`${style.movie_info_item} ${style.movie_info_title}`}>
            {movieTitle}
          </li>
          {rating.ratingGrade !== "" ? (
            <li className={style.movie_info_item}>등급: {ratingGrade}</li>
          ) : null}
          {movie.runtime !== "" ? (
            <li className={style.movie_info_item}>
              상영시간: {movie.runtime}분
            </li>
          ) : null}
          <li className={style.movie_info_item}>개봉일: {releaseDate}</li>
        </ul>
      </Link>
    </li>
  );
}
