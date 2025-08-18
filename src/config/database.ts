import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config()
const MONGO_URI = process.env.MONGO_URI as string;
export const connectDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
  } catch (error) {
    process.exit(1); 
  }
};
