import mongoose, { Model, Schema } from "mongoose"; 
import { IProduct } from "../types/product";


const ProductSchema: Schema<IProduct> = new Schema(
  {
    images:[{
      type: String, 
     
     }],
    
    title: {
      type: String,
      
    },


    description: {
      type: String,
      
    },


    price: {
      type: Number,  
    
    },

    category:{
      type:String,
      
    },
    
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",

    },
  },
  {
    timestamps: true,
  }
);




const Product: Model<IProduct> = mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
