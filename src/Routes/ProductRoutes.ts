import express from "express";
import addProduct from "../Controllers/ProductController";
import VerifyJWT from "../MiddleWares/AuthMiddleWare";
import upload from "../MiddleWares/Multer";

const router = express.Router();
//@ts-ignore




router.post("/addproduct",VerifyJWT,upload, addProduct);

export default router;
