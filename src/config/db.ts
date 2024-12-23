import mongoose from "mongoose";
import { config } from "./config";

const connectDB = async () => {
  try {
    await mongoose.connect(config.databaseUrl as string);
    mongoose.connection.on('connected',()=>{
        console.log("Connected successfully to database")
    })
    mongoose.connection.on("error", (err) => {
      console.log("Error in connecting to database",err);
    });
  } catch (error) {
    console.error("Failed to connect with database",error)
    process.exit(1)
  }
};

export default connectDB;