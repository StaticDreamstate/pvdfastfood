"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const path_1 = __importDefault(require("path"));
const logger = winston_1.default.createLogger({
    defaultMeta: { service: 'user-service' },
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json(), winston_1.default.format.errors({ stack: true })),
    transports: [
        new winston_1.default.transports.File({ filename: path_1.default.resolve("src", "infra", "logs", "errors.log"),
            level: "error" }),
        new winston_1.default.transports.File({ filename: path_1.default.resolve("src", "infra", "logs", "warns.log"),
            level: "warn" }),
        new winston_1.default.transports.File({ filename: path_1.default.resolve("src", "infra", "logs", "info.log"),
            level: "info" }),
        new winston_1.default.transports.File({ filename: path_1.default.resolve("src", "infra", "logs", "tests.log"),
            level: "debug" }),
    ],
});
if (process.env.NODE_ENV !== "production") {
    logger.add(new winston_1.default.transports.Console({
        format: winston_1.default.format.simple(),
    }));
}
exports.default = logger;
