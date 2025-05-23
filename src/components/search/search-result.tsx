import { MovieAndPosterDetail, MovieAndPosterResult } from "@/types/movie";

import style from "./search-result.module.scss";
import MovieItem from "../movie/movie-item";
import { extractMostFrequentGenre } from "@/utils/format/extractMostFrequentGenre";
import GenreStorageSaver from "../genre-storage-saver";

const SearchResult = async ({ movie }: Readonly<{ movie: string }>) => {
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

  if (!movieList || movieList.length === 0) {
    return <div>검색 결과가 없습니다.</div>;
  }

  const genre = extractMostFrequentGenre(movieList);

  return (
    <>
      <ul className={style.list}>
        {movieList.map((movie: MovieAndPosterDetail) => (
          <MovieItem key={movie.DOCID} movie={movie} />
        ))}
      </ul>

      <GenreStorageSaver genre={genre} />
    </>
  );
};

export default SearchResult;
