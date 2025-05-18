"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import style from "./searchbar.module.scss";
import SearchHistoryList from "./search-history-list";
import { useSearchStore } from "@/stores/useSearchStore";

const Searchbar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const { addSearchTerm } = useSearchStore();
  const [showSearchTerms, setShowSearchTerms] = useState(false);
  const articleRef = useRef<HTMLElement | null>(null);

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

  useEffect(() => {
    if (!showSearchTerms) return;

    function handleClickOutside(e: MouseEvent) {
      if (
        articleRef.current &&
        !articleRef.current.contains(e.target as Node)
      ) {
        setShowSearchTerms(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSearchTerms]);

  return (
    <article className={style.article} ref={articleRef}>
      <div className={style.container}>
        <input
          name="movie"
          value={search}
          onChange={onChangeSearch}
          onKeyDown={onKeyDown}
          placeholder="영화 제목을 입력하세요"
          className={`${style.movie} ${
            showSearchTerms ? style.border : style.border_none
          }`}
          onClick={() => setShowSearchTerms(true)}
          autoComplete="off"
        />

        {showSearchTerms ? (
          <SearchHistoryList
            onSelect={(term) => setSearch(term)}
            setShowSearchTerms={setShowSearchTerms}
          />
        ) : null}
      </div>
    </article>
  );
};

export default Searchbar;
