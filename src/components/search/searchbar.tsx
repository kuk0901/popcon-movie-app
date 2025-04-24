"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import style from "./search.module.scss";

const Searchbar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");

  const movie = searchParams.get("movie");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || movie === search) return;

    router.push(`/search?movie=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className={style.container}>
      <input
        name="movie"
        value={search}
        onChange={onChangeSearch}
        onKeyDown={onKeyDown}
        placeholder="영화 제목을 입력하세요"
        className={style.movie}
      />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
};

export default Searchbar;
