import { Request } from "express";
import User from "../Models/User.model";

 //@ts-ignore
const register = async(req:Request,res:Response)=>{
       const {username,email,password} = req.body;

       if(!username || !email || !password){
        //@ts-ignore
        res.status(401).json({
            message:"All fields are require"
        })
       }
       
       try {
  
        const ExistingUser = User.findOne({email});
          //@ts-ignore
        if(ExistingUser){
             //@ts-ignore
             res.status(401).json({
                message:"User already Exist,Please login"
             })
        }
       
          const user =  User.create({
                username,
                email,
                password

          })
           //@ts-ignore
          const newUser = await user.save()

          




        
       } catch (error:any) {
        
       }




}