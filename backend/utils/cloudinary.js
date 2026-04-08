import dotenv from "dotenv"
dotenv.config()
import {v2 as cloudinary} from 'cloudinary'
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// console.log("cloud name",  process.env.CLOUDINARY_NAME)
// console.log("api key", process.env.CLOUDINARY_API_SECRET)
// console.log("api secret", process.env.CLOUDINARY_API_KEY)

const uploadOnCloudinary = async (filePath) => {
    try {
        if (!filePath) return null;

        if (!process.env.CLOUDINARY_NAME) {
            console.log("Offline mode: skipping upload");
            return { secure_url: filePath, public_id: "local-file" };
        }

        const response = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto",
            format: "webp", // only webp
        });

        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

        return response;

    } catch (error) {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        console.error("Cloudinary upload error:", error); // log error
        throw new Error("Cloudinary upload failed: " + error.message);
    }
};

export { uploadOnCloudinary };