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
        })

        // Optamize URL (auto AVIF)
        const optimizedUrl = cloudinary.url(response.public_id, {
            transformation: [
                {width: 1000, crop: "scale"},
                {quality: "auto:eco"},
                {fetch_format: "auto"}
            ]
        });

        // Force for avif
        const avifUrl = cloudinary.url(response.public_id, {
            transformation: [
                {quality: "auto"},
                {fetch_format: "avif"}
            ]
        });


        fs.unlinkSync(localfilePath)

        return {
            original: response.secure_url,
            optimized: optimizedUrl,
            avif: avifUrl,
            public_id: response.public_id
        };

    } catch (error) {
        if(localfilePath && fs.existsSync(localfilePath)){
            fs.unlinkSync(localfilePath)
        }
            console.error("Upload failed on cloudinary: ", error)
            throw error
    }
}