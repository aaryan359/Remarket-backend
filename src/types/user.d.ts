import { Document, Types } from "mongoose";

// Assuming there is an Order schema and model already defined
import { IOrder } from "./Order"; 

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    refreshToken?: string;  // refreshToken is optional
    address: string;        // User's address, required field
    product: Types.Array<Types.ObjectId>; // Array of references to Product documents
    orders: Types.Array<Types.ObjectId> | IOrder[]; // Array of references to Order documents
    createdAt?: Date;       // Timestamp fields (createdAt, updatedAt) are auto-managed by Mongoose
    updatedAt?: Date;
}
