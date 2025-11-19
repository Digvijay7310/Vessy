import dotenv from 'dotenv'
dotenv.config()
import { connectDB } from './src/config/db.js'
import app from './app.js'

const PORT = process.env.PORT || 8000

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server running port ${PORT}`)
    })
})
.catch((err) => {
    console.log("mongodb not connected ", PORT)
})