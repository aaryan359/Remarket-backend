import express, { Request,Response } from "express";


const app = express();
const PORT = 8888;

app.use(express.json());


app.get('/',(req:Request, res:Response)=>{
     res.send('helloe lodu')
})

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})

