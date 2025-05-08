import { Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  pwd?: string;
  userName: string;
  provider?: string;
  providerAccountId?: string;
  image?: string;
  emailVerified?: Date;
  createdAt?: Date;
}
