import mongoose from "mongoose";

const dbconnect = async () => {
    try {
        const response = await mongoose.connect('mongodb+srv://aaryanmeena96:cMJIhoW8w48GSqAM@cluster0.k57za.mongodb.net/reMarket');
        console.log("Database connected:", response.connection?.db?.databaseName || "Unknown database");
    } catch (error: any) {
        console.error("Database connection failed:", error.message);
        process.exit(1); // Exit process if the connection fails
    }
};

export default dbconnect;
