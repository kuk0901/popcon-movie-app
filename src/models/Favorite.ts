import mongoose from "mongoose";

// FIXME: 개수 제한을 둘 것 -> User처럼 수정 필요
const FavoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  movieList: [
    {
      movieId: { type: String, required: true }, // pk
      movieTitle: { type: String, required: true },
      posterURL: { type: String },
      addedAt: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Favorite ||
  mongoose.model("Favorite", FavoriteSchema);
