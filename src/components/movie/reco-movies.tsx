import { MovieAndPosterDetail, MovieAndPosterResult } from "@/types/movie";
import MovieItem from "./movie-item";
import style from "./reco-upcoming-movies.module.scss";
import recoDirector from "@/data/recoDirector.json";

export default async function RecoMovies() {
  const randomDirector =
    recoDirector[Math.floor(Math.random() * recoDirector.length)];

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_MOVIE_KMDB_API_SERVER}&director=${randomDirector.name}&sort=prodYear,1&listCount=10&ServiceKey=${process.env.NEXT_PUBLIC_MOVIE_KMDB_API_KEY}`,
    {
      next: {
        revalidate: 100
      }
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
      <h2 className={style.movies_title}>
        추천 영화: {randomDirector.name} 감독
      </h2>
      <ul className={style.movies_list}>
        {movieList.map((movie: MovieAndPosterDetail) => (
          <MovieItem key={movie.DOCID} movie={movie} />
        ))}
      </ul>
    </article>
  );
}
