import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const uploadOnCloudinary = async(localfilePath) => {
    try {
        if(!localfilePath) return null;
    
        const response = await cloudinary.uploader.upload(localfilePath, {
            resource_type: 'image',
            quality: 'auto',
            fetch_format: 'auto'
        })
        fs.unlinkSync(localfilePath)
        console.log("media upload on cloudinary ",response.secure_url)
        return response.secure_url
    } catch (error) {
        if(localfilePath && fs.existsSync(localfilePath)){
            fs.unlinkSync(localfilePath)
        }
            console.error("Upload failed on cloudinary: ", error)
            throw error
    }
}