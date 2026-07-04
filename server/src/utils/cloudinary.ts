import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Initialize Cloudinary configuration immediately
(async function initCloudinary() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
})();

export const cloudinaryFolderName = "boulder_beta";

const uploadOnCloudinary = async (
  file: string,
  id: number,
): Promise<string | null> => {
  try {
    if (!file) return null;

    const result = await cloudinary.uploader.upload(file, {
      folder: cloudinaryFolderName,
      resource_type: "image",
      public_id: String(id),
    });

    // Clean up local file after successful upload
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }

    return result.url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);

    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
      console.log("Local file cleaned up after error:", file);
    } else {
      console.warn("Local file not found for cleanup:", file);
    }

    return null;
  }
};

const getFromCloudinary = async (public_id: number) => {
  try {
    const resource = await cloudinary.api.resource(String(public_id));
    return cloudinary.url(resource.public_id);
  } catch (err) {
    console.error(err);
  }
};

export { uploadOnCloudinary, getFromCloudinary };
