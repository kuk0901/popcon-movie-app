"use client";

import { useSearchStore } from "@/stores/useSearchStore";
import style from "./search-history-list.module.scss";
import { useRouter } from "next/navigation";

// FIXME: 클릭 후 안 보여야 함
export default function SearchHistoryList({
  onSelect,
  setShowSearchTerms
}: Readonly<{
  onSelect: (term: string) => void;
  setShowSearchTerms: (searchTerms: boolean) => void;
}>) {
  const { searchTerms, addSearchTerm, removeSearchTermByIndex } =
    useSearchStore();
  const router = useRouter();

  if (searchTerms.length === 0) return null;

  const handleRemoveClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    idx: number
  ) => {
    e.preventDefault();
    removeSearchTermByIndex(idx);
  };

  const handleAddClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    term: string
  ) => {
    e.preventDefault();
    addSearchTerm(term);
    router.push(`/search?movie=${term}`);
    setShowSearchTerms(false);
    onSelect(term);
  };

  return (
    <div className={style.container}>
      <ul className={style.search_list}>
        {searchTerms.map((term: string, idx: number) => (
          <li key={term + idx} className={style.search_item}>
            <button
              className={style.search_content}
              onClick={(e) => handleAddClick(e, term)}
              aria-label={`검색어 ${term} 클릭`}
              type="button"
            >
              {term}
            </button>
            <button
              onClick={(e) => handleRemoveClick(e, idx)}
              className={style.search_remove_button}
              aria-label={`검색어 ${term} 삭제`}
              type="button"
            >
              X
            </button>
          </li>
        ))}
      </ul>

      <div className={style.hidden}></div>
    </div>
  );
}
