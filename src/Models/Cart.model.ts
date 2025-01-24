import mongoose,{Model, modelNames, Schema} from "mongoose";
import { ICart } from "../types/cart";
 

const CartSchema = new mongoose.Schema({

     items:[{
        type:Schema.Types.ObjectId,
        ref:'Product'
     }],
     user:{
        type:Schema.Types.ObjectId,
        ref:'User'
     }

})

const Cart: Model<ICart> = mongoose.model<ICart>("Cart", CartSchema);
export default Cart;





