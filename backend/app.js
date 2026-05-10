import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
dotenv.config()

const app = express()

// Add build-in middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("Hey there! This is testing route")
})

// Routes
import adminRoutes from "./routes/admin.routes.js"
import cartRoutes from "./routes/cart.routes.js"
import categoryRoues from "./routes/category.routes.js"
import customerRoutes from "./routes/customer.routes.js"
import productRoutes from "./routes/product.routes.js"
import orderRoutes from "./routes/order.route.js"

app.use("/api/admins", adminRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/categories", categoryRoues)
app.use("/api/customer", customerRoutes)
app.use("/api/products", productRoutes)
app.use("/api/orders", orderRoutes)


export {app}