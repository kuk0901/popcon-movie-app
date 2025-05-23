"use client";

import { useEffect } from "react";

const STORAGE_KEY = "searchGenres";

// Record<string, number> 형태로 저장 (장르별 카운트 누적)
const saveGenreToLocalStorage = (genre: string) => {
  if (!genre) return;
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  stored[genre] = (stored[genre] || 0) + 1;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
};

export default function GenreStorageSaver({
  genre
}: Readonly<{ genre: string }>) {
  useEffect(() => {
    saveGenreToLocalStorage(genre);
  }, [genre]);

  return null; // UI는 필요 없으니 렌더링하지 않음
}
