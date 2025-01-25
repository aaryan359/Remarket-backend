import mongoose, { Model, Schema } from "mongoose"; 
import { IProduct } from "../types/product";


const ProductSchema: Schema<IProduct> = new Schema(
  {
    images:[{
      type: String, 
      required: true
     }],
    
    title: {
      type: String,
      required: true,
    },


    description: {
      type: String,
      required: true,
    },


    price: {
      type: Number,  
      required: true,
    },

    category:{
      type:String,
      required:true
    },
    
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, 
    },
  },
  {
    timestamps: true,
  }
);




const Product: Model<IProduct> = mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
