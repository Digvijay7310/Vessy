import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI)
        console.log(`DB Connected: ${connectionInstance.connect.host}`);
    } catch (error) {
        console.log("DB connection failed, ", error);
        process.exit(1);
    }
}

export default connectDB;