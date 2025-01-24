import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";


declare module 'express' {
  interface Request {
    user?: JwtPayload | string; 
  }
}

const VerifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }


    const token = authHeader.split(" ")[1];

    // Verify the token
    const secretKey = process.env.JWT_SECRET||""; 


    const decoded = jwt.verify(token, secretKey) as JwtPayload;

  
    req.user = decoded;

    
    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

export default VerifyJWT;
