import dotenv from "dotenv"
dotenv.config()
import {f2 as cloudinary} from 'cloudinary'
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadOnCloudinary = async(filePath) => {
    try {
        if(!filePath) return null;

        const response = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto",
            format: "webp",
            quality: "auto",
        });

        fs.unlinkSync(filePath)
        return response;
    } catch (error) {
        fs.unlinkSync(filePath)
        return null;
    }
}

export {uploadOnCloudinary}