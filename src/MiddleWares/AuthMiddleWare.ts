import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../Models/User.model";
dotenv.config();




declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | { userId: string };
    }
  }
}




const VerifyJWT = async (req: Request, res: Response, next: NextFunction) => {

  try {

    // Extract the token from the Authorization header
    const token = req.header("Authorization")?.replace('Bearer ', '');


    if (!token) {
      return res.status(400).json({

        message: "Token not provided"

      });
    }


    let decodedToken;

    try {

         decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);

         //@ts-ignore
         req.user = decodedToken;

    } 
    catch (error: any) 
     {
      if (error instanceof jwt.TokenExpiredError) {

        return res.status(401).json({
          message: "Token has expired" 
        });

      }

      return res.status(403).json({ 
        message: "Invalid token", 
        error: error.message });
     }
    
  
    //@ts-ignore
    const user = await User.findById(decodedToken?.userId);


    if (!user) {
      return res.status(404).json({
        message: "User not found, please login again",
      });
    }


    req.user = user;
    next(); 

  } catch (error: any) {

    return res.status(500).json({
      message: "An error occurred",
      error: error.message,
    });
    
  }
};

export default VerifyJWT;
