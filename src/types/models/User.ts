import { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  pwd?: string;
  userName: string;
  provider?: string;
  providerAccountId?: string;
  image?: string;
  emailVerified?: Date;
  createdAt?: Date;
}
