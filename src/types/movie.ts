export interface MovieListItem {
  movieCd: string;
  movieNm: string;
  movieNmEn: string;
  prdtYear: string;
  openDt: string;
  typeNm: string;
  prdtStatNm: string;
  nationAlt: string;
  genreAlt: string;
  repNationNm: string;
  repGenreNm: string;
  directors: {
    peopleNm: string;
  }[];
  companys: {
    companyCd: string;
    companyNm: string;
  }[];
}

export interface MovieListResult {
  totCn: number;
  source: string;
  movieList: MovieListItem[];
}

export type MovieList = [] | MovieListItem[];

export interface MovieDetail {
  movieCd: string;
  movieNm: string;
  movieNmEn: string;
  movieNmOg: string;
  prdtYear: string;
  showTm: string;
  openDt: string;
  prdtStatNm: string;
  typeNm: string;

  nations: Array<{ nationNm: string }>;
  genres: Array<{ genreNm: string }>;
  directors: Array<{ peopleNm?: string; peopleNmEn?: string }>;
  actors: Array<{
    peopleNm: string;
    peopleNmEn: string;
    cast: string;
    castEn: string;
  }>;
  showTypes: Array<{ showTypeGroupNm?: string; showTypeNm?: string }>;
  audits: Array<{ auditNo?: string; watchGradeNm?: string }>;
  companys: Array<{
    companyCd?: string;
    companyNm?: string;
    companyNmEn?: string;
    companyPartNm?: string;
  }>;
  staffs: Array<{
    peopleNm?: string;
    peopleNmEn?: string;
    staffRoleNm?: string;
  }>;

  nationNm?: string; // 중복 가능성 주의
  genreNm?: string;
  companyCd?: string;
  companyNm?: string;
  companyNmEn?: string;
  companyPartNm?: string;
  staffRoleNm?: string;
}

export interface MovieDetailResult {
  movieInfo: MovieDetail;
  source: string;
}

export interface MovieAndPosterDetail {
  rowValue: string; // 검색결과 리스트 내 일련 번호
  docid: string; // pk
  movieId: string; // 등록 ID
  title: string; // 영화명
  directorNm: string; // 감독명
  actorNm: string; // 배우명
  nation: string; // 제작국가
  company: string; // 제작사
  prodYear: string; // 제작년도
  plot: string; // 줄거리
  runtime: string; // 대표상영시간
  rating: string; // 대표관람등급
  genre: string;
  kmdbUrl: string; // 링크 url
  releaseDate: string; // 개봉일
  posterUrl: string; // 포스터 url
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface MovieAndPosterResult {
  Data: MovieAndPosterDetailResult[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface MovieAndPosterDetailResult {
  collName: string;
  count: number;
  Result: MovieAndPosterDetail[];
  totalCount: number;
}
