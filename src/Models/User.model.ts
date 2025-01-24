import mongoose, {Model, Schema} from "mongoose";
import { IUser } from "../types/user";



const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        },
        product: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Product',
            }
        ],
        cart:{
            type:Schema.Types.ObjectId,
            ref:'Cart'
        }

    },
    {
        timestamps: true
    }
)




const User: Model<IUser> = mongoose.model<IUser>("Product", UserSchema);
export default User;