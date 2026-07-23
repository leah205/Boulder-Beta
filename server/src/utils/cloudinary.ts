import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import config from "@/config";

// Initialize Cloudinary configuration immediately
(async function initCloudinary() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
})();

const cloudinaryFolderName = config.cloudinary_folder;

const uploadOnCloudinary = async (
  file: string,
  resource_type: "video" | "image",
): Promise<string | null> => {
  try {
    if (!file) return null;

    const result = await cloudinary.uploader.upload(file, {
      folder: cloudinaryFolderName,
      type: "authenticated",
      resource_type,
      invalidate: true,
    });

    // Clean up local file after successful upload
    if (fs.existsSync(file) && file.includes("public/temp")) {
      fs.unlinkSync(file);
    }

    return result.public_id;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);

    if (fs.existsSync(file) && file.includes("public/temp")) {
      console.log("unlink exists");
      fs.unlinkSync(file);
      console.log("Local file cleaned up after error:", file);
    } else {
      console.warn("Local file not found for cleanup:", file);
    }

    return null;
  }
};

function getCloudinarySignedUrl(
  public_id: string,
  resource_type: "video" | "image",
) {
  return cloudinary.url(public_id, {
    type: "authenticated",
    sign_url: true,
    resource_type,
  });
}

export { uploadOnCloudinary, getCloudinarySignedUrl };
