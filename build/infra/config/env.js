"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const ENV = {
    API_NAME: process.env.API_NAME,
    API_VER: process.env.API_VER,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: Number(process.env.DB_PORT),
    DB_NAME: process.env.DB_NAME,
    NODE_ENV: process.env.NODE_ENV,
    MONGODB_URL: process.env.MONGODB_URL,
    KITCHEN_ADDR: process.env.KITCHEN_ADDR,
    KITCHEN_PORT: process.env.KITCHEN_PORT,
    PRINTER_INT: process.env.PRINTER_ENV,
};
exports.default = ENV;
