import { MovieAndPosterDetail } from "@/types/movie";
import Image from "next/image";
import style from "./movie-detail-render.module.scss";
import { movieReleaseDateToKorDate } from "@/utils/format/stringToDate";
import { RatingType } from "./movie-item";

interface PlotType {
  plotLang: string;
  plotText: string;
}

export default function MovieDetailRender({
  movie
}: Readonly<{ movie: MovieAndPosterDetail }>) {
  console.log("movie", movie);

  const rating: RatingType = movie?.ratings.rating[0];
  const releaseDate = movieReleaseDateToKorDate(rating.releaseDate);
  const posterUrl: string[] = movie?.posters.split("|");
  const movieTitle = movie?.title?.replace(/!HS|!HE/g, "");
  const ratingGrade = rating.ratingGrade.split("||")[0];
  const plot: PlotType[] = movie?.plots.plot.filter(
    (p: PlotType) => p.plotLang === "한국어"
  );
  const koPlot = plot[0];

  return (
    <section className={style.movie_section}>
      <div className={style.movie_info}>
        <div className={style.movie_poster}>
          {posterUrl[0] !== "" ? (
            <Image
              src={posterUrl[0]}
              alt={`${movie.title}의 포스터 이미지`}
              width={400}
              height={500}
              className={style.movie_poster_img}
            />
          ) : (
            <Image
              src="/samplePoster.png"
              alt={`${movie.title}의 포스터 이미지`}
              width={400}
              height={500}
              className={style.movie_poster_img}
            />
          )}
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
      </div>

      <div className={style.movie_plot}>{koPlot.plotText}</div>
    </section>
  );
}
