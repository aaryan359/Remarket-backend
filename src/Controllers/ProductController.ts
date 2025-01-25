import { Request, response, Response } from "express";
import Product from "../Models/Product.model";
import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'; 
import dotenv from "dotenv";
dotenv.config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Add product function
const addProduct = async (req: Request, res: Response) => {
  try {
    const { title, description, price,category } = req.body;
    //@ts-ignore
    const userId = req.user._id; 




    // Accessing images array from req.files
    //@ts-ignore
    const imageFile = req.file?.path;
    console.log("image is ",imageFile);



    if (!imageFile) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }


    console.log("Image File:", imageFile);

          let response;
          try {
             response = await cloudinary.uploader.upload(imageFile,{
              resource_type:'auto'
            })
            fs.unlinkSync(imageFile);
          } catch (error) {
              fs.unlinkSync(imageFile);
              return null;
          }

          const imageUrl = response.url;
    

    // Create and save the product
    const product = new Product({
      title,
      description,
      price,
      category,
      images: [imageUrl],
      user: userId,
    });

    await product.save();


    // Send response
    res.status(201).json({
      success: true,
      message: "Product uploaded successfully",
    });

  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default addProduct;
