import express from "express";
import addProduct from "../Controllers/ProductController";
import VerifyJWT from "../MiddleWares/AuthMiddleWare";
import multer from "multer";



// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/assets');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});




const upload = multer({ storage: storage });


const router = express.Router();

// Route to add product
//@ts-ignore
router.post("/addproduct", VerifyJWT, upload.single('image'), addProduct);

export default router;
