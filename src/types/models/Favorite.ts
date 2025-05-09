import { Document, Types } from "mongoose";

export interface IFavorite extends Document {
  user: Types.ObjectId;
  docId: string;
  movieId: string;
  movieTitle: string;
  posterURL?: string;
  addedAt: Date;
  movieSeq: string;
}
