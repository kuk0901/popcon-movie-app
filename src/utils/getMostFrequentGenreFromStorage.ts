export function getMostFrequentGenreFromStorage(): string {
  if (typeof window === "undefined") {
    return "판타지"; // 서버 사이드 렌더링에서는 localStorage에 접근할 수 없음
  }

  const raw = localStorage.getItem("searchGenres");
  if (!raw) return "드라마";

  try {
    const record: Record<string, number> = JSON.parse(raw);
    let maxKey: string | null = null;
    let maxValue = -Infinity;

    for (const [key, value] of Object.entries(record)) {
      if (value > maxValue) {
        maxKey = key;
        maxValue = value;
      }
    }

    return maxKey ?? "액션";
  } catch {
    return "액션";
  }
}
