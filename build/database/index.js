"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoDB = void 0;
const Connection_1 = __importDefault(require("./Connection"));
const env_1 = __importDefault(require("../infra/config/env"));
// const mongoDB = new Connection(`mongodb://${ENV.DB_HOST}:${ENV.DB_PORT}/${ENV.DB_NAME}`);
const mongoDB = new Connection_1.default(`${env_1.default.MONGODB_URL}`);
exports.mongoDB = mongoDB;
