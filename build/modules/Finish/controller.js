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
const logger_1 = __importDefault(require("../../infra/logger"));
const Cart_1 = __importDefault(require("../../models/Cart"));
const Finish_1 = __importDefault(require("../../models/Finish"));
const controller = {
    kitchen(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { pagamento } = req.body;
                const order = yield Cart_1.default.findOne({ _id: id });
                const total = order === null || order === void 0 ? void 0 : order.total;
                const payment = Number(total) + 5;
                const troco = Number(total) - payment;
                const close = yield Finish_1.default.create({
                    id_pedido: id,
                    pagamento: pagamento,
                    total: total,
                    recebido: payment,
                    troco: troco,
                });
                logger_1.default.info(`[kitchen]Pedido finalizado: ${req.socket.remoteAddress}`);
                return res.status(201).json(close);
            }
            catch (error) {
                logger_1.default.error(`[kitchen]Erro ao finalizar pedido: ${error}-  ${req.socket.remoteAddress}`);
                return res.status(500).json(`${error}`);
            }
        });
    },
};
exports.default = controller;
