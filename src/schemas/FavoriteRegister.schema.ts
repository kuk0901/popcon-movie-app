import { z } from "zod";

export const FavoriteRegisterSchema = z.object({
  user: z.string(),
  docId: z.string(),
  movieId: z.string(),
  movieTitle: z.string(),
  posterURL: z.string().optional(),
  movieSeq: z.string()
});
