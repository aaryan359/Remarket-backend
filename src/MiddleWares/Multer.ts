import multer from "multer";

// Set up Multer storage configuration
const storage = multer.diskStorage({

  destination: (req, file, cb) => {
   
    cb(null, "/assets"); 
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname); 
  },

});

const upload = multer({ storage }).array("images", 10);
export default upload;
