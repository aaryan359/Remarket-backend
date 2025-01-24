import cloudinary, { v2 } from "cloudinary";
import fs from 'fs'

// @ts-ignore
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//@ts-ignore
const uploadOnCloudinary= async(localpath) =>{
    try{
    const uploadResult = await v2.uploader
       .upload(
        localpath, {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    }
    catch{
        //@ts-ignore
        fs.unlink(localpath);
        return null;
    }
}

export default uploadOnCloudinary;
    