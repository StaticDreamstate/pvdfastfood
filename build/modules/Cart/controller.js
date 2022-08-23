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
const Products_1 = __importDefault(require("../../models/Products"));
let itemsId = undefined || [];
let search;
let total = 0;
const controller = {
    order(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cliente, items, observacao } = req.body;
                let itemsArr = items.split(",");
                for (let i = 0; i < itemsArr.length; i++) {
                    if (itemsArr[i].length > 1) {
                        search = yield Products_1.default.findOne({ nome: itemsArr[i] });
                        total += Number(search.preco);
                        itemsId[i] = search._id;
                    }
                    else {
                        search = yield Products_1.default.findOne({ codigo: itemsArr[i] });
                        total += Number(search.preco);
                        itemsId[i] = search._id;
                    }
                }
                const newOrder = yield Cart_1.default.create({
                    cliente: cliente,
                    items: itemsId,
                    observacao: observacao,
                    total: total,
                });
                logger_1.default.info(`[order]Pedido aberto: ${req.socket.remoteAddress}`);
                return res.status(201).json(newOrder);
            }
            catch (error) {
                logger_1.default.error(`[order]Erro ao abrir pedido: ${error}-  ${req.socket.remoteAddress}`);
                return res.status(500).json(`${error}`);
            }
        });
    },
    editOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cliente, items, observacao } = req.body;
                const { id } = req.params;
                let itemsArr = items.split(",");
                for (let i = 0; i < itemsArr.length; i++) {
                    if (itemsArr[i].length > 1) {
                        search = yield Products_1.default.findOne({ nome: itemsArr[i] });
                        total += Number(search.preco);
                        itemsId[i] = search._id;
                    }
                    else {
                        search = yield Products_1.default.findOne({ codigo: itemsArr[i] });
                        total += Number(search.preco);
                        itemsId[i] = search._id;
                    }
                }
                const check = yield Cart_1.default.findById(id);
                if (!check) {
                    logger_1.default.error(`[editOrder]Pedido não encontrado: ${req.socket.remoteAddress}`);
                    return res.status(404).json("Pedido não encontrado");
                }
                if (Object.keys(req.body).length === 0) {
                    logger_1.default.error(`[editOrder]Corpo vazio: ${req.socket.remoteAddress}`);
                    return res.status(400).json("Dados insuficientes para Atualização");
                }
                const modifyOrder = yield Cart_1.default.findOneAndUpdate({ _id: id }, {
                    cliente: cliente,
                    items: itemsId,
                    observacao: observacao,
                    total: total,
                }, {
                    new: true,
                });
                return res.status(201).json(modifyOrder);
            }
            catch (error) {
                logger_1.default.error(`[editPlan]Erro ao editar o plano: ${error}-  ${req.socket.remoteAddress}`);
                return res.status(500).json(`${error}`);
            }
        });
    },
    cancelOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield Cart_1.default.deleteOne({ _id: id });
                return res.sendStatus(204);
            }
            catch (error) {
                logger_1.default.error(`[cancelOrder]Erro ao deletar pedido: ${error}-  ${req.socket.remoteAddress}`);
                return res.status(500).json(`${error}`);
            }
        });
    },
};
exports.default = controller;
