"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import style from "./search.module.scss";
import SearchHistoryList from "./search-history-list";
import { useSearchStore } from "@/stores/useSearchStore";

// FIXME: 동작 확인
const Searchbar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const { addSearchTerm } = useSearchStore();

  // searchTerms
  const [showSearchTerms, setShowSearchTerms] = useState(false);

  const movie = searchParams.get("movie");

  useEffect(() => {
    setSearch(movie || "");
  }, [movie]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    setShowSearchTerms(false);
    if (!search || movie === search) return;

    addSearchTerm(search);

    router.push(`/search?movie=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <article className={style.article}>
      <div className={style.container}>
        <input
          name="movie"
          value={search}
          onChange={onChangeSearch}
          onKeyDown={onKeyDown}
          placeholder="영화 제목을 입력하세요"
          className={style.movie}
          onClick={() => setShowSearchTerms(true)}
          autoComplete="off"
        />
        <button onClick={onSubmit}>검색</button>
      </div>

      {showSearchTerms ? (
        <SearchHistoryList
          onSelect={(term) => setSearch(term)}
          setShowSearchTerms={setShowSearchTerms}
        />
      ) : null}
    </article>
  );
};

export default Searchbar;
