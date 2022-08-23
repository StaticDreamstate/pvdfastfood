"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes_1 = __importDefault(require("../../modules/API/routes"));
const routes_2 = __importDefault(require("../../modules/Menu/routes"));
const routes_3 = __importDefault(require("../../modules/Cart/routes"));
const routes_4 = __importDefault(require("../../modules/Finish/routes"));
const routes = (0, express_1.Router)();
routes.use(routes_1.default);
routes.use(routes_2.default);
routes.use(routes_3.default);
routes.use(routes_4.default);
exports.default = routes;
