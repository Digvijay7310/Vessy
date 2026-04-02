import dotenv from 'dotenv'
dotenv.config()
import { app } from './app.js'
import connectDB from './config/db.js'

connectDB()
.then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server running on port ${process.env.PORT}`)
    });
})
.catch((err) => {
    console.log("MongoDB connection failed", err)
})