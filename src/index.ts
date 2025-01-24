import express, { Request,Response } from "express";
import dbconnect from "./Config/db";
import productroutes from "./Routes/ProductRoutes";
import dotenv from "dotenv";
dotenv.config();

const app = express();



app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('api/v1/',productroutes);



dbconnect();


app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})

