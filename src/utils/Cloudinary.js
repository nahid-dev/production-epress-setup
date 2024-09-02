import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINRAY_CLOUD_NAME,
    api_key: process.env.CLOUDINRAY_API_KEY,
    api_secret: process.env.CLOUDINRAY_API_SECRET,
});
