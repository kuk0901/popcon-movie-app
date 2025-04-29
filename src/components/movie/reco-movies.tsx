import { MovieAndPosterDetail, MovieAndPosterResult } from "@/types/movie";
import MovieItem from "./movie-item";
import style from "./reco-upcoming-movies.module.scss";

// 특정 유명 영화 감독들 리스트를 미리 세팅해두고 -> // 그 감독의 영화들 중 랜덤으로 10개를 추천하는 컴포넌트
// 영화 감독 리스트 ㄱㄱ

export default async function RecoMovies() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_MOVIE_KMDB_API_SERVER}&nation=대한민국&director=봉준호&listCount=10&ServiceKey=${process.env.NEXT_PUBLIC_MOVIE_KMDB_API_KEY}`,
    { cache: "force-cache" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data: MovieAndPosterResult = await res.json();
  const { Data } = data;
  const movieList: MovieAndPosterDetail[] = Data[0].Result;

  return (
    <section className={style.movies}>
      <h2 className={style.movies_title}>추천 영화</h2>
      <ul className={style.movies_list}>
        {movieList.map((movie: MovieAndPosterDetail) => (
          <MovieItem key={movie.DOCID} movie={movie} />
        ))}
      </ul>
    </section>
  );
}
