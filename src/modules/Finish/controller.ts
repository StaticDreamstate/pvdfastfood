import { Request, Response } from "express";
import logger from "../../infra/logger";
import Cart, { ICart } from "../../models/Cart";
import Finish from "../../models/Finish";
// import WebSocket from "ws";
// import ENV from "../../infra/config/env";
// import printClient from "../../infra/config/printer";

const controller = {

    async finish(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { pagamento } = req.body;
            const order = await Cart.findOne({ _id: id });
            const total = order?.total;
            const payment = Number(total) + 5;
            const troco = Number(total) - payment;

            const closeOrder = await Finish.create({
                id_pedido: id,
                cliente: order?.cliente,
                pagamento: pagamento,
                total: total,
                recebido: payment,
                troco: troco,
            });

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

            logger.info(`[finish]Pedido finalizado: ${req.socket.remoteAddress}`);
            return res.status(201).json(closeOrder);
        } catch (error) {
            logger.error(`[finish]Erro ao finalizar pedido: ${error}-  ${req.socket.remoteAddress}`);
            return res.status(500).json(`${error}`);
        }
    },

    async kitchen(req: Request, res: Response) {
        try {
            const { id } = req.params;

            await Finish.deleteOne({ id_pedido: id });
            await Cart.deleteOne({ _id: id });

            logger.info(`[kitchen]A cozinha deu baixa: ${req.socket.remoteAddress}`);
            return res.status(204).json();
        } catch (error) {
            logger.error(`[kitchen]Erro ao dar baixa: ${error}-  ${req.socket.remoteAddress}`);
            return res.status(500).json(`${error}`);
        }
    },

}

export default controller;