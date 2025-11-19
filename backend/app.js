import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import adminRoutes from './src/routes/admin.routes.js'
import productRoutes from './src/routes/product.route.js'
import userRoutes from './src/routes/user.routes.js'


const app = express()
const PORT = process.env.PORT || 8000

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use("/api/admins", adminRoutes)
app.use("/api/products", productRoutes)
app.use("/api/users/", userRoutes)

app.get("/", (req, res) => {
    console.log("Server running on port: ", PORT || 8000)
})




export default app