import { Request, Response } from "express";
import User from "../Models/User.model";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import dotenv from "dotenv";
dotenv.config();


//tested
const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password } = req.body;

    
        if (!username || !email || !password) {

            //@ts-ignore
            return res.status(400).json({
                message: "All fields (username, email, password) are required.",
            });
        }

        const existingUser = await User.findOne({ email});


        if (existingUser) {
            //@ts-ignore
            return res.status(409).json({
                message: "Email already exists.",
            });
        }


        const hashedPassword = await bcrypt.hash(password, 10);


        const user = new User({
            username,
            email,
            password: hashedPassword,
        });
        
        await user.save();
    

        const token = jwt.sign(
            {
                userId: user._id,
                email: email,
                username: username, 
            },
            process.env.JWT_SECRET as string,
            { expiresIn: "2d" }
        );
   
        res.status(201).json({
              token,
              message: "User registered successfully.",
        });

    } 
    catch (error:any)
     {
        res.status(500).json({
            message: "Registration failed",
            error: error.message,
        });
    }
};







// Login User
const loginUser = async (req: Request, res: Response): Promise<void> => {

    const {  email, password } = req.body;

    try {
    
        if ( !email || !password) {
            //@ts-ignore
            return res.status(400).json({
                message: "Either username or email, and password are required.",
            });
        }

        
        const user = await User.findOne({ email });

        if (!user) {
            //@ts-ignore
            return res.status(404).json({
                message: "User not found.",
            });
        }


        // Check if the password is valid
        const isPasswordValid = await bcrypt.compare(password, user.password);



        if (!isPasswordValid) {
            //@ts-ignore
            return res.status(401).json({
                message: "Invalid credentials.",
            });
        }

      
       
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
            },
            process.env.JWT_SECRET as string,
            { expiresIn: "2d" }
        );


        


        // Send the response
        res.status(200).json({
            user,
            token,
            message: "User logged in successfully.",
        });




    }
     catch (error:any)
      {
        res.status(500).json({
            message: "An error occurred during login.",
            error: error.message
        });
    }
};


export { registerUser, loginUser };
