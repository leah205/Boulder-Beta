import dotenv from "dotenv";

dotenv.config();

const secret = process.env.SECRET;
const env = process.env.NODE_ENV;
const cloudinary_folder = process.env.CLOUDINARY_FOLDER;
const db_url =
  env == "test" ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL;

// const cloudinary_folder = env == "test" ? "test_boulder_beta" : "boulder_beta";

if (!secret) {
  throw new Error("secret is not defined");
}

if (!db_url) {
  throw new Error("db url is missing");
}

if (!cloudinary_folder) {
  throw new Error("cloudinary folder is missing");
}

interface Config {
  secret: string;
  port: number;
  db_url: string;
  cloudinary_folder: string;
}

const config: Config = {
  secret: secret,
  port: Number(process.env.PORT) || 8080,
  db_url: db_url,
  cloudinary_folder: cloudinary_folder,
};

export default config;
