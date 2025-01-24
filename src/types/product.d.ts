import { Document, Types } from "mongoose";

export interface IProduct extends Document {
  images: string[];
  title: string;
  description: string;
  price: number;
  user: Types.ObjectId;
}

  