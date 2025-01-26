
import { Document, Types } from "mongoose";

export interface IOrder extends Document{
  user: mongoose.Types.ObjectId;     
  product: mongoose.Types.ObjectId;  
  createdAt: Date;                   
  updatedAt: Date;                   
}


