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
  const sizes = className?.includes("detail_poster")
    ? "(max-width: 480px) 220px, (max-width: 768px) 280px, 350px"
    : "230px";

  return (
    <div className={`${style.poster_wrapper} ${className}`}>
      {posterUrl !== "" ? (
        <Image
          src={posterUrl}
          alt={`${movieTitle}의 포스터 이미지`}
          fill
          className={`${style.movie_poster_img}`}
          sizes={sizes}
          priority
        />
      ) : (
        <Image
          src="/samplePoster.png"
          alt={`${movieTitle}의 포스터 이미지`}
          fill
          className={`${style.movie_poster_img}`}
          sizes={sizes}
          priority
        />
      )}
    </div>
  );
}
