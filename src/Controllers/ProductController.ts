import { Request, Response } from "express";
import Product from "../Models/Product.model";
import { v2 as cloudinary } from "cloudinary"; // Cloudinary import


// @ts-ignore: 
const addProduct = async (req: Request, res: Response) => {
  try {
    
    const { title, description, price } = req.body;

    // @ts-ignore: 
    const userId = req.user._id; 


    // Cast req.files to the correct type (Multer file array)
    const imagesarray = req.files as Express.Multer.File[];

    if (!imagesarray || imagesarray.length === 0) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }


    // Upload images to Cloudinary
    const uploadedImages = await Promise.all(
      imagesarray.map((file) =>
        cloudinary.uploader.upload(file.path, {
          folder: "remarket", 
        })
      )
    );

    // Extract image URLs from the Cloudinary upload responses
    const images = uploadedImages.map((upload) => upload.secure_url);

    
    const product = new Product({
      title,
      description,
      price,
      images, 
      user: userId,
    });

    
    const newProduct = await product.save();

    
    res.status(201).json({
      success: true,
      message:"Uploaded Successfully",
    });

  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default addProduct;
