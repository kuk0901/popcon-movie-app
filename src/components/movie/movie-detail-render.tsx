import { MovieDetail as MovieDetailType } from "@/types/movie";
// import style from "./movie-detail-render.module.scss";

export default function MovieDetailRender({
  movie
}: Readonly<{ movie: MovieDetailType }>) {
  console.log("movie", movie);
  return (
    <section>
      <div>{movie.movieNm}</div>
    </section>
  );
}
