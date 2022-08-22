"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("./controller"));
const routes = (0, express_1.Router)();
routes.post("/order", controller_1.default.order);
routes.put("/order/:id", controller_1.default.editOrder);
routes.delete("/order/:id", controller_1.default.cancelOrder);
exports.default = routes;
