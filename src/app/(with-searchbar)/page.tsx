import RecoMovies from "@/components/movie/reco-movies";
import UpcomingMovies from "@/components/movie/upcoming-movies";
import style from "./page.module.scss";

export default function Home() {
  return (
    <section className={style.section}>
      <RecoMovies />
      <UpcomingMovies />
    </section>
  );
}
