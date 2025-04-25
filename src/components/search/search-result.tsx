import { MovieListItem, MovieListResult } from "@/types/movie";
import MovieItem from "../movie/movie-item";
import style from "./search-result.module.scss";

interface ApiResponse {
  movieListResult?: MovieListResult;
}

const SearchResult = async ({ movie }: Readonly<{ movie: string }>) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_MOVIE_LIST_API_SERVER}?key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&curPage=1&itemPerPage=10&movieNm=${movie}`,
    {
      cache: "force-cache"
    }
  );

  if (!res.ok) {
    console.error(`API 요청 실패: ${res.status}`);
    return <div>검색 결과를 불러오는 데 실패했습니다.</div>;
  }

  const data: ApiResponse = await res.json();
  const movieListResult = data.movieListResult;

  if (!movieListResult?.movieList || movieListResult.movieList.length === 0) {
    return <div>검색 결과가 없습니다.</div>;
  }

  const movieList: MovieListItem[] = movieListResult.movieList;

  return (
    <ul className={style.list}>
      {movieList.map((movie: MovieListItem) => (
        <MovieItem key={movie.movieCd + movie.movieNm} movie={movie} />
      ))}
    </ul>
  );
};

export default SearchResult;
