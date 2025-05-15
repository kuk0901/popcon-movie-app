import MovieDetailRender from "@/components/movie/movie-detail-render";
import ToastRenderer from "@/components/toast/toast-render";
import { MovieAndPosterDetail, MovieAndPosterResult } from "@/types/movie";
import { notFound } from "next/navigation";

async function MovieDetail({
  movieId,
  movieSeq
}: Readonly<{ movieId: string; movieSeq: string }>) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_MOVIE_KMDB_API_SERVER}&detail=Y&movieId=${movieId}&movieSeq=${movieSeq}&ServiceKey=${process.env.NEXT_PUBLIC_MOVIE_KMDB_API_KEY}`,
    {
      cache: "force-cache"
    }
  );

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }

    return <div>오류가 발생했습니다...</div>;
  }

  const data: MovieAndPosterResult = await res.json();
  const { Data } = data;
  const movieList: MovieAndPosterDetail[] = Data[0].Result;

  if (!movieList || movieList.length == 0) {
    return <div>영화의 상세 정보가 존재하지 않습니다.</div>;
  }

  return <MovieDetailRender movie={movieList[0]} />;
}

export default async function Page({
  params
}: Readonly<{ params: Promise<{ id: string[] }> }>) {
  const { id } = await params;
  const [movieId, movieSeq] = id;

  return (
    <>
      <ToastRenderer ids={["favorite"]} />
      <MovieDetail movieId={movieId} movieSeq={movieSeq} />
    </>
  );
}
