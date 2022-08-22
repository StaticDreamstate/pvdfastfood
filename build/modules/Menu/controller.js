"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Products_1 = __importDefault(require("../../models/Products"));
const logger_1 = __importDefault(require("../../infra/logger"));
const controller = {
    menu(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const topMenu = yield Products_1.default.find().sort({ created_at: -1 }).limit(5);
                return res.status(200).json(topMenu);
            }
            catch (error) {
                logger_1.default.error(`[topMenu]Erro ao consultar o cardápio: ${error}-  ${req.socket.remoteAddress}`);
                return res.status(500).json(`${error}`);
            }
        });
    },
    search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { param } = req.params;
                if (String(param).length > 1) {
                    const nameCheck = yield Products_1.default.find({ nome: param }, { _id: 0, codigo: 1, nome: 1, descricao: 1, preco: 1 });
                    return res.status(200).json(nameCheck);
                }
                else {
                    const codeCheck = yield Products_1.default.find({ codigo: param }, { _id: 0, codigo: 1, nome: 1, descricao: 1, preco: 1 });
                    return res.status(200).json(codeCheck);
                }
                return res.status(200).json(null);
            }
            catch (error) {
                logger_1.default.error(`[search]Erro ao buscar produto: ${error}-  ${req.socket.remoteAddress}`);
                return res.status(500).json(`${error}`);
            }
        });
    },
};
exports.default = controller;
