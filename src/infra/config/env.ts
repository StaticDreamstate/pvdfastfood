import "dotenv/config";

const ENV = {
  API_NAME: process.env.API_NAME as string,
  API_VER: process.env.API_VER as string,
  DB_HOST: process.env.DB_HOST as string,
  DB_PORT: Number(process.env.DB_PORT as string),
  DB_NAME: process.env.DB_NAME as string,
  NODE_ENV: process.env.NODE_ENV as string,
  MONGODB_URL: process.env.MONGODB_URL as string,
  KITCHEN_ADDR: process.env.KITCHEN_ADDR as string,
};

export default ENV;
