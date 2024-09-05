import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINRAY_CLOUD_NAME,
    api_key: process.env.CLOUDINRAY_API_KEY,
    api_secret: process.env.CLOUDINRAY_API_SECRET,
});

const uploadCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        // upload the file on cloudinary
        const response = cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });
        //file has been uploaded successfully
        console.log("File is uploaded cloudinary.", response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); //remove the locally save temporary file as the upload operation got failed.
        return null;
    }
};

export { uploadCloudinary };