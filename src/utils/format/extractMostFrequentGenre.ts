import { MovieAndPosterDetail } from "@/types/movie";
import { parseGenreString } from "./parseGenreString";

export const extractMostFrequentGenre = (movieList: MovieAndPosterDetail[]) => {
  const allGenres = movieList.flatMap((movie) => parseGenreString(movie.genre));

  // 빈도수 집계
  const genreCount: Record<string, number> = {};
  allGenres.forEach((genre) => {
    genreCount[genre] = (genreCount[genre] || 0) + 1;
  });

  // 가장 많이 등장한 장르 찾기
  let maxGenre = "";
  let maxCount = 0;
  for (const [genre, count] of Object.entries(genreCount)) {
    if (count > maxCount) {
      maxGenre = genre;
      maxCount = count;
    }
  }

  return maxGenre;
};
