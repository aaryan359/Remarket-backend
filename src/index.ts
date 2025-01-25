import express, { Request, Response } from "express";
import dbconnect from "./Config/db";
import productroutes from "./Routes/ProductRoutes";

import userRoute from "./Routes/UserRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
dbconnect();

// Routes
app.use('/api/v1/', productroutes); 
app.use('/api/v1/', userRoute);     

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
