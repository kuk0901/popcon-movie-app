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
