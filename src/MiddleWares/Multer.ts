import multer from "multer";

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify where to store the uploaded files temporarily
    cb(null, "/assets"); 
  },

  filename: (req, file, cb) => {
    // Set a unique filename for each file
    cb(null, Date.now() + file.originalname); 
  },

});

const upload = multer({ storage: storage }).array("images", 10);
export default upload;
