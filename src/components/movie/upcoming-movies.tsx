import { MovieAndPosterDetail, MovieAndPosterResult } from "@/types/movie";
import MovieItem from "./movie-item";
import style from "./reco-upcoming-movies.module.scss";

export default async function UpcomingMovies() {
  const dateObj = new Date();
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const date = String(dateObj.getDate()).padStart(2, "0");
  const today = `${year}${month}${date}`;

  // FIXME: 날짜 최신순으로 정렬!
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_MOVIE_KMDB_API_SERVER}&nation=대한민국&releaseDts=${today}&listCount=10&ServiceKey=${process.env.NEXT_PUBLIC_MOVIE_KMDB_API_KEY}`,
    {
      cache: "force-cache"
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data: MovieAndPosterResult = await res.json();
  const { Data } = data;
  const movieList: MovieAndPosterDetail[] = Data[0].Result;

  return (
    <article className={style.movies}>
      <h2 className={style.movies_title}>개봉 예정 영화</h2>
      <ul className={style.movies_list}>
        {movieList.map((movie: MovieAndPosterDetail) => (
          <MovieItem key={movie.DOCID} movie={movie} />
        ))}
      </ul>
    </article>
  );
}
