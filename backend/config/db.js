import mongoose from "mongoose";

const connectDB = async() => {
    try {
        const connectionInstance = mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDB connected: ${(await connectionInstance).connection.host}`)
    } catch (error) {
        console.log("Error ",error)
        process.exit(1);
    }
}

export default connectDB