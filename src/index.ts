import express, { Request,Response } from "express";
import dbconnect from "./Config/db";


const app = express();
const PORT = 8888;

app.use(express.json());


app.get('/',(req:Request, res:Response)=>{
     res.send('helloe lodu')
})

dbconnect();


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})

