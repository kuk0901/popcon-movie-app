import { z } from "zod";

export const FavoriteDeleteSchema = z.object({
  user: z.string(),
  movieId: z.string()
});
