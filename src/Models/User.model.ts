import mongoose, {Model, Schema} from "mongoose";
import { IUser } from "../types/user";



const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            lowercase: true,
            trim: true, 
            
        },
        email: {
            type: String,
            required: true,
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
        
        address:{
             type:String, 
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



const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
export default User;