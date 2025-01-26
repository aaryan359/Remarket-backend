import { Request, response, Response } from "express";
import Product from "../Models/Product.model";
import User from "../Models/User.model";
import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';
import dotenv from "dotenv";
dotenv.config();




cloudinary.config({
  cloud_name: 'dd5bk5dti',
  api_key: '578637526532462',
  api_secret: 'CSQs9hiCGj44EgY7rS1kMa7ry3I',
});



const addProduct = async (req: Request, res: Response) => {

  try {
    const { title, description, price, category } = req.body;
  

    if (!title || !description || !price || !category) {
      res.status(404).json({
        message: "All inputs are required"
      })
    }




    //@ts-ignore
    const userId = req.user._id;

 

    // Access the uploaded image file from req.file
    const imageFile = req.file?.path;

    if (!imageFile) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }


    // Upload the image to Cloudinary
    let response;
    try {
      
      response = await cloudinary.uploader.upload(imageFile, {
        resource_type: 'auto',
        folder: 'remarket',
        transformation: [
          {
            width: 500, 
            height: 500, 
            crop: 'fill',
            gravity: 'center', 
          }
        ]
      });
      fs.unlinkSync(imageFile);

    } catch (error) {
      fs.unlinkSync(imageFile);

      return res.status(500).json({ success: false, message: "Error uploading to Cloudinary" });
    }


    const imageUrl = response.secure_url;




    const newproduct = new Product({
      title,
      description,
      price,
      category,
      images: [imageUrl],
      user: userId,
    });

    await newproduct.save();
    

    // Send response back to the client
    res.status(201).json({
      success: true,
      message: "Product uploaded successfully",
    });


  } catch (error: any) 
  {
    console.error(error);
    res.status(500).json({
       success: false, message: error.message
       });
  }
};


export default addProduct


