import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";

const connection = asyncHandler(async () => {
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
  console.log("database connected");
});

export default connection;
