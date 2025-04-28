import { MovieAndPosterDetail } from "@/types/movie";
import { movieReleaseDateToKorDate } from "@/utils/format/stringToDate";
import Image from "next/image";
import style from "./movie-poster-simple-item.module.scss";

// FIXME: 해당 컴포넌트를 클릭할 경우 줄거리 포함된 상세페이지를 모달 형태로 띄움
// FIXME: 모달에서 사용
// interface PlotType {
//   plotLang: string;
//   plotText: string;
// }

interface RatingType {
  ratingDate: string;
  ratingGrade: string;
  releaseDate: string;
}

export default function MoviePosterSimpleItem({
  movie
}: Readonly<{ movie: MovieAndPosterDetail }>) {
  // FIXME: 모달에서 사용
  // const plot: PlotType[] = movie?.plots.plot.filter(
  //   (p: PlotType) => p.plotLang === "한국어"
  // );
  // const koPlot = plot[0];
  const rating: RatingType = movie?.ratings.rating[0];
  const releaseDate = movieReleaseDateToKorDate(rating.releaseDate);
  const posterUrl: string[] = movie?.posters.split("|");
  const movieTitle = movie?.title?.replace(/!HS|!HE/g, "");

  return (
    <li className={style.movies_item}>
      <div className={style.movie_poster}>
        {posterUrl[0] !== "" ? (
          <Image
            src={posterUrl[0]}
            alt={`${movie.title}의 포스터 이미지`}
            width={230}
            height={300}
            className={style.movie_poster_img}
          />
        ) : (
          <Image
            src="/samplePoster.png"
            alt={`${movie.title}의 포스터 이미지`}
            width={230}
            height={300}
            className={style.movie_poster_img}
          />
        )}
      </div>

      <ul className={style.movie_info_list}>
        <li className={`${style.movie_info_item} ${style.movie_info_title}`}>
          {movieTitle}
        </li>
        {rating.ratingGrade !== "" ? (
          <li className={style.movie_info_item}>등급: {rating.ratingGrade}</li>
        ) : null}
        {movie.runtime !== "" ? (
          <li className={style.movie_info_item}>상영시간: {movie.runtime}분</li>
        ) : null}
        <li className={style.movie_info_item}>개봉일: {releaseDate}</li>
      </ul>
    </li>
  );
}
