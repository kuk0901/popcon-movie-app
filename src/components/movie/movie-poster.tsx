import Image from "next/image";
import style from "./movie-poster.module.scss";

export default function MoviePoster({
  posterUrl,
  movieTitle,
  height = 300,
  width = 230
}: Readonly<{
  posterUrl: string;
  movieTitle: string;
  height?: number;
  width?: number;
}>) {
  return (
    <>
      {posterUrl !== "" ? (
        <Image
          src={posterUrl}
          alt={`${movieTitle}의 포스터 이미지`}
          width={width}
          height={height}
          className={style.movie_poster_img}
        />
      ) : (
        <Image
          src="/samplePoster.png"
          alt={`${movieTitle}의 포스터 이미지`}
          width={width}
          height={height}
          className={style.movie_poster_img}
        />
      )}
    </>
  );
}
