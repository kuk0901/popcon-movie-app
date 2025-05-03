import mongoose, { Schema, Model } from "mongoose";
import { IUser } from "@/types/models/User";

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true, trim: true },
  pwd: { type: String, trim: true },
  userName: { type: String, required: true, trim: true },
  provider: { type: String, default: "credentials" },
  providerAccountId: { type: String },
  image: { type: String },
  emailVerified: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
