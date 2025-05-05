import { IFavorite } from "@/types/models/Favorite";
import mongoose, { Model } from "mongoose";

const FavoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true
  },
  movieId: { type: String, required: true, trim: true, index: true },
  movieTitle: { type: String, required: true, trim: true, index: true },
  posterURL: { type: String },
  addedAt: { type: Date, default: Date.now }
});

FavoriteSchema.index({ user: 1, movieId: 1 }, { unique: true });

const Favorite: Model<IFavorite> =
  mongoose.models && mongoose.models.Favorite
    ? mongoose.models.Favorite
    : mongoose.model<IFavorite>("Favorite", FavoriteSchema);

export default Favorite;
