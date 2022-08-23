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
// import WebSocket from "ws";
// import ENV from "../../infra/config/env";
// import printClient from "../../infra/config/printer";
const controller = {
    finish(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { pagamento } = req.body;
                const order = yield Cart_1.default.findOne({ _id: id });
                const total = order === null || order === void 0 ? void 0 : order.total;
                const payment = Number(total) + 5;
                const troco = Number(total) - payment;
                const closeOrder = yield Finish_1.default.create({
                    id_pedido: id,
                    cliente: order === null || order === void 0 ? void 0 : order.cliente,
                    pagamento: pagamento,
                    total: total,
                    recebido: payment,
                    troco: troco,
                });
                /* Observação:
    
                    Os trechos comentados são referentes ao uso da impressora térmica e do uso dos Websockets
                    para enviar a a resposta para a cozinha. Como eu não tenho uma impressora térmica, não
                    pude testar. O Websockets eu testei simulando um endereço de retorno com o netcat(nc).
    
                    Para evitar possíveis problemas na plataforma heroku durante o deploy, achei melhor
                    desabilitar esses recursos por agora.
    
                */
                //try {
                //    printClient(closeOrder.cliente, closeOrder.pagamento, closeOrder.total);
                //} catch (error) {
                //    logger.error(`[printClient]Erro na impressão: ${error}`);
                //}
                // try {
                //     const ws = new WebSocket(`ws://${ENV.KITCHEN_ADDR}:${ENV.KITCHEN_PORT}`);
                //     ws.on('open', function open() {
                //         ws.send(String(closeOrder));
                //     })
                //     }catch (error) {
                //     logger.error(`[WebSockets]Falha na comunicação com a cozinha ${ENV.KITCHEN_ADDR}:${ENV.KITCHEN_PORT}} - ${error}`);
                // }
                logger_1.default.info(`[finish]Pedido finalizado: ${req.socket.remoteAddress}`);
                return res.status(201).json(closeOrder);
            }
            catch (error) {
                logger_1.default.error(`[finish]Erro ao finalizar pedido: ${error}-  ${req.socket.remoteAddress}`);
                return res.status(500).json(`${error}`);
            }
        });
    },
    kitchen(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield Finish_1.default.deleteOne({ id_pedido: id });
                yield Cart_1.default.deleteOne({ _id: id });
                logger_1.default.info(`[kitchen]A cozinha deu baixa: ${req.socket.remoteAddress}`);
                return res.status(204).json();
            }
            catch (error) {
                logger_1.default.error(`[kitchen]Erro ao dar baixa: ${error}-  ${req.socket.remoteAddress}`);
                return res.status(500).json(`${error}`);
            }
        });
    },
};
exports.default = controller;
