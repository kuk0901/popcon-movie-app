export const dynamic = "force-dynamic";

import MovieDetailRender from "@/components/movie/movie-detail-render";
import MovieDetailSkeleton from "@/components/skeletons/movie-detail-skeleton";
import ToastRenderer from "@/components/toast/toast-render";
import { MovieAndPosterDetail, MovieAndPosterResult } from "@/types/movie";
import { notFound } from "next/navigation";
import { Suspense } from "react";

async function MovieDetail({
  movieId,
  movieSeq
}: Readonly<{ movieId: string; movieSeq: string }>) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;

  const res = await fetch(
    `${baseUrl}/api/kmdb-proxy?detail=Y&movieId=${movieId}&movieSeq=${movieSeq}`,
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

      <Suspense fallback={<MovieDetailSkeleton />}>
        <MovieDetail movieId={movieId} movieSeq={movieSeq} />
      </Suspense>
    </>
  );
}
