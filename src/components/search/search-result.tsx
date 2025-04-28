import { MovieAndPosterDetail, MovieAndPosterResult } from "@/types/movie";

import style from "./search-result.module.scss";
import MoviePosterSimpleItem from "../movie/movie-poster-simple-item";

const SearchResult = async ({ movie }: Readonly<{ movie: string }>) => {
  console.log("movie", movie);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_MOVIE_KMDB_API_SERVER}&title=${movie}&ServiceKey=${process.env.NEXT_PUBLIC_MOVIE_KMDB_API_KEY}`,
    {
      cache: "force-cache"
    }
  );

  if (!res.ok) {
    console.error(`API 요청 실패: ${res.status}`);
    return <div>검색 결과를 불러오는 데 실패했습니다.</div>;
  }

  const data: MovieAndPosterResult = await res.json();
  const { Data } = data;
  const movieList: MovieAndPosterDetail[] = Data[0].Result;
  console.log("movieList", movieList);

  if (movieList.length === 0) {
    return <div>검색 결과가 없습니다.</div>;
  }

  return (
    <ul className={style.list}>
      {movieList.map((movie: MovieAndPosterDetail) => (
        <MoviePosterSimpleItem key={movie.DOCID} movie={movie} />
      ))}
    </ul>
  );
};

export default SearchResult;
