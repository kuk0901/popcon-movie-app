import MovieDetailRender from "@/components/movie/movie-detail-render";
import { MovieDetailResult } from "@/types/movie";
import { notFound } from "next/navigation";

interface ApiResponse {
  movieInfoResult?: MovieDetailResult;
}

async function MovieDetail({ movieCd }: Readonly<{ movieCd: string }>) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_MOVIE_DETAIL_API_SERVER}?key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&movieCd=${movieCd}`,
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

  const data: ApiResponse = await res.json();
  const movieInfoResult = data.movieInfoResult;

  if (!movieInfoResult?.movieInfo) {
    return <div>영화의 상세 정보가 존재하지 않습니다.</div>;
  }

  const movieInfo = movieInfoResult.movieInfo;
  console.log("movieInfo", movieInfo);

  return <MovieDetailRender movie={movieInfo} />;
}

export default async function Page({
  params
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const { id } = await params;

  return <MovieDetail movieCd={id} />;
}
