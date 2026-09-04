import mongoose from "mongoose";
import config from "./config.ts";

const connectDB = async () => {
    const mongoURI = config.MONGODB_URI;

    if (!mongoURI) {

        throw new Error("MONGODB_URI is not defined in environment variables");
    }

    try {
        await mongoose.connect(mongoURI);
        console.log("MongDB connected successfully");
    } catch (error) {
        console.log("MongoDB connection failed")
        process.exit(1);
    }
}

export default connectDB;