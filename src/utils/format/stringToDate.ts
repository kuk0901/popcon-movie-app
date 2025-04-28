export const movieReleaseDateToKorDate = (date: string): string => {
  if (!date) return "정보 없음";

  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6, 8);
  return `${year}년 ${month}월 ${day}일`;
};
