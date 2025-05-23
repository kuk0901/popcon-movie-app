export const parseGenreString = (genreString: string): string[] => {
  return genreString
    .split(",")
    .map((g) => g.trim())
    .filter((g) => g !== "");
};
