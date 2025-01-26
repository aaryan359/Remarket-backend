import mongoose, {Model, Schema} from "mongoose";
import { IUser } from "../types/user";



const UserSchema = new Schema(
    {
        username: {
            type: String,
            required:true
            
        },
        email: {
            type: String,
            required:true
       
        },
        password: {
            type: String,
            required:true
            
        },
        refreshToken: {
            type: String,
            require:true
        },
        address:{
             type:String, 
             required:true
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