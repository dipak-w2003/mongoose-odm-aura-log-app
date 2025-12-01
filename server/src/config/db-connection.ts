import mongoose from "mongoose";
import { envConfigs } from "./env-configs";
export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(envConfigs.mongoConfig.cs as string)
  } catch (error) {
    console.log("Mongodb connection failed !!");
  }
}
// check which database are we currently using 
mongoose.connection.on("connected", () => {
  console.log("connected to DB : ", mongoose.connection.name);
})