import dotenv from "dotenv";

dotenv.config();

export const config = {
  APP_PORT: process.env.APP_PORT || 3001,
  APP_HOST: process.env.APP_HOST || "localhost",

  MONGO_URI: process.env.MONGO_URI,

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "defaultAccessSecret",
  JWT_ACCESS_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION || "15m",

  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "defaultRefreshSecret",
  JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION || "10d",
};
