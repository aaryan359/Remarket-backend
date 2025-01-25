import mongoose, { Model, Schema } from "mongoose";
import { IOrder } from "../types/Order";

const OrderSchema: Schema<IOrder> = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",                
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",             
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

// Create and export the model
const Order: Model<IOrder> = mongoose.model<IOrder>("Order", OrderSchema);
export default Order;
