import { MovieAndPosterDetail } from "@/types/movie";
import style from "./movie-detail-render.module.scss";
import { movieReleaseDateToKorDate } from "@/utils/format/stringToDate";
import { RatingType } from "./movie-item";
import { getActorNamesToJoinStr } from "@/utils/getActorNamesToJoinStr";
import MoviePoster from "./movie-poster";
import MovieInfoList from "./movie-info-list";
import BackRouteButton from "../button/back-route-button";
import MovieFavoriteButton from "../button/movie-favorite-button.server";
import MovieAwards from "./movie-awards";
import posterStyle from "./movie-poster.module.scss";

interface PlotType {
  plotLang: string;
  plotText: string;
}

export default function MovieDetailRender({
  movie
}: Readonly<{ movie: MovieAndPosterDetail }>) {
  const rating: RatingType = movie?.ratings.rating[0];
  const releaseDate: string = movieReleaseDateToKorDate(rating.releaseDate);
  const posterUrl: string[] = movie?.posters.split("|");
  const movieTitle: string = movie?.title?.replace(/!HS|!HE/g, "");
  const ratingGrade: string = rating.ratingGrade.split("||")[0];
  const plot: PlotType[] = movie?.plots.plot.filter(
    (p: PlotType) => p.plotLang === "한국어"
  );
  const koPlot = plot[0];
  const actorNames: string = getActorNamesToJoinStr(movie.actors?.actor);
  const director: string = movie.directors?.director[0].directorNm;
  const genres: string = movie?.genre.replaceAll(",", ", ");
  const companys: string = movie?.company.replaceAll(",", ", ");
  const nation: string = movie?.nation.replaceAll(",", ", ");
  const awards: string[] = movie.Awards1.split("|")
    .map((award: string) => {
      const trimmedAward = award.trim();
      if (trimmedAward.endsWith(" -")) {
        return trimmedAward.slice(0, -3).trim();
      }
      return trimmedAward;
    })
    .slice(0, 7);

  return (
    <section className={style.movie_section}>
      <article className={style.movie_info}>
        <div className={style.movie_poster}>
          <MoviePoster
            posterUrl={posterUrl[0]}
            movieTitle={movieTitle}
            className={posterStyle.detail_poster}
          />
        </div>

        <div className={style.movie_info_list}>
          <MovieInfoList
            movieTitle={movieTitle}
            ratingGrade={ratingGrade}
            runtime={movie.runtime}
            releaseDate={releaseDate}
            actorNames={actorNames}
            director={director}
            genres={genres}
            companys={companys}
            nation={nation}
          />

          <div>
            <MovieFavoriteButton
              docId={movie.DOCID}
              movieId={movie.movieId}
              posterURL={posterUrl[0]}
              movieTitle={movieTitle}
              movieSeq={movie.movieSeq}
            />
          </div>
        </div>
      </article>

      <MovieAwards awards={awards} />

      <article className={style.movie_plot}>
        <div className={style.movie_plot_title}>줄거리</div>
        <div className={style.movie_plot_content}>{koPlot.plotText}</div>
      </article>

      <BackRouteButton />
    </section>
  );
}
