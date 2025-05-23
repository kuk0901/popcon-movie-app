export const dynamic = "force-dynamic";

import RecoMovies from "@/components/movie/reco-movies";
import UpcomingMovies from "@/components/movie/upcoming-movies";
import style from "./page.module.scss";
import ToastRenderer from "@/components/toast/toast-render";
import ToastOnSignout from "@/components/toast/toast-on-signout";
import { Suspense } from "react";
import MovieListSkeleton from "@/components/skeletons/movie-list-skeleton";
import GenreMovies from "@/components/movie/genre-movies";

export default async function Home() {
  return (
    <>
      <section className={style.section}>
        <Suspense fallback={<MovieListSkeleton />}>
          <RecoMovies />
        </Suspense>

        <Suspense fallback={<MovieListSkeleton />}>
          <GenreMovies />
        </Suspense>

        <Suspense fallback={<MovieListSkeleton />}>
          <UpcomingMovies />
        </Suspense>
      </section>

      <ToastRenderer ids={["signin", "signout"]} />

      <Suspense fallback={null}>
        <ToastOnSignout />
      </Suspense>
    </>
  );
}
