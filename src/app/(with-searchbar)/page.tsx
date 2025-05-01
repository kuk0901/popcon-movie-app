// 추천 영화 api 호출

import RecoMovies from "@/components/movie/reco-movies";
import UpcomingMovies from "@/components/movie/upcoming-movies";

// 최근 검색 영화 api 호출

export default function Home() {
  return (
    <div>
      <RecoMovies />
      <UpcomingMovies />
    </div>
  );
}
