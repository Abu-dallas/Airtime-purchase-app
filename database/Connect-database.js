import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB alrady Connected ");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_DB_URL, {
      dbName: "airtime_app",
    });
    isConnected = true;
    console.log("MongoDB is Connected");
    return;
  } catch (error) {
    console.log("[Connect_To_DB_Error]", error);
  }
};
