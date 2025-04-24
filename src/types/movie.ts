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
