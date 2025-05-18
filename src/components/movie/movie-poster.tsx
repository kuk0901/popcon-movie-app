import Image from "next/image";
import style from "./movie-poster.module.scss";

export default function MoviePoster({
  posterUrl,
  movieTitle,
  className
}: Readonly<{
  posterUrl: string;
  movieTitle: string;
  height?: number;
  width?: number;
  className?: string;
}>) {
  return (
    <div className={`${style.poster_wrapper} ${className}`}>
      {posterUrl !== "" ? (
        <Image
          src={posterUrl}
          alt={`${movieTitle}의 포스터 이미지`}
          fill
          className={`${style.movie_poster_img}`}
        />
      ) : (
        <Image
          src="/samplePoster.png"
          alt={`${movieTitle}의 포스터 이미지`}
          fill
          className={`${style.movie_poster_img}`}
        />
      )}
    </div>
  );
}
