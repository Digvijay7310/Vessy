import mongoose from 'mongoose'


export const connectDB = async() => {
    try {
        const mongooseInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
        console.log("DB connected")
        console.log(`DB HOST ${mongooseInstance.connection.host}`)
    } catch (error) {
        console.log("DB Connection Error: ",error)
    }
}