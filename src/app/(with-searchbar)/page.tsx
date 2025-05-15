import RecoMovies from "@/components/movie/reco-movies";
import UpcomingMovies from "@/components/movie/upcoming-movies";
import style from "./page.module.scss";
import ToastRenderer from "@/components/toast/toast-render";
import ToastOnSignout from "@/components/toast/toast-on-signout";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <section className={style.section}>
        <RecoMovies />
        <UpcomingMovies />
      </section>

      <ToastRenderer ids={["signin", "signout"]} />

      <Suspense fallback={null}>
        <ToastOnSignout />
      </Suspense>
    </>
  );
}
