import { Document, Types } from "mongoose";

import { IOrder } from "./Order"; 

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    refreshToken?: string;  
    address: string;        
    product: Types.Array<Types.ObjectId>; 
    orders: Types.Array<Types.ObjectId> | IOrder[]; 
    createdAt?: Date;       
    updatedAt?: Date;
}
