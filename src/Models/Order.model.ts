import mongoose, { Model, Schema } from "mongoose";
import { IOrder } from "../types/Order";

// Define the Order schema
const OrderSchema: Schema<IOrder> = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",                 // Reference to the User model
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",             // Reference to the Product model 
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
