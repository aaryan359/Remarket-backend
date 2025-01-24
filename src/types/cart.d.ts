import { Document, Types } from "mongoose";

export interface ICart extends Document {
  user: Types.ObjectId;
  items: { product: Types.ObjectId; quantity: number }[];
}
