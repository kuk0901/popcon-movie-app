"use client";

import { MovieAndPosterDetail, MovieAndPosterResult } from "@/types/movie";
import { getMostFrequentGenreFromStorage } from "@/utils/getMostFrequentGenreFromStorage";
import { useEffect, useState } from "react";
import MovieItem from "./movie-item";
import style from "./reco-upcoming-movies.module.scss";

export default function GenreMovies() {
  const [movieList, setMovieList] = useState<MovieAndPosterDetail[]>([]);
  const [genre, setGenre] = useState<string>("");

  const getGenreMovies = async (genre = "판타지") => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MOVIE_KMDB_API_SERVER}&genre=${genre}&sort=prodYear,1&listCount=10&ServiceKey=${process.env.NEXT_PUBLIC_MOVIE_KMDB_API_KEY}`,
      {
        cache: "force-cache"
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data: MovieAndPosterResult = await res.json();
    const { Data } = data;
    const movieList: MovieAndPosterDetail[] = Data[0].Result?.toSorted(
      (a, b) => b.repRlsDate - a.repRlsDate
    );

    setMovieList(movieList);
  };

  useEffect(() => {
    setGenre(getMostFrequentGenreFromStorage());
  }, []);

  useEffect(() => {
    getGenreMovies(genre);
  }, [genre]);

  return (
    <article className={style.movies}>
      <h2 className={style.movies_title}>내가 좋아하는 장르 영화</h2>
      <ul className={style.movies_list}>
        {movieList?.map((movie: MovieAndPosterDetail) => (
          <MovieItem key={movie.DOCID} movie={movie} />
        ))}
      </ul>
    </article>
  );
}
