import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }
    const connUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/student_management_db";
    const conn = await mongoose.connect(connUri);
    console.log(`=========================================`);
    console.log(` ✅ MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    console.log(`=========================================`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
