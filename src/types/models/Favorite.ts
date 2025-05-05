import { Document, Types } from "mongoose";

export interface IFavorite extends Document {
  user: Types.ObjectId;
  movieId: string;
  movieTitle: string;
  posterURL?: string;
  addedAt: Date;
}
