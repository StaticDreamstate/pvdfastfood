import { Request, Response } from "express";
import logger from "../../infra/logger";
import Cart, { ICart } from "../../models/Cart";
import Finish from "../../models/Finish";

const controller = {

    async finish(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { pagamento } = req.body;
            const order = await Cart.findOne({ _id: id });
            const total = order?.total;
            const payment = Number(total)+5;
            const troco = Number(total)-payment;

            const close = await Finish.create({
                 id_pedido: id,
                 pagamento: pagamento,
                 total: total,
                 recebido: payment,
                 troco: troco,
             });

            logger.info(`[kitchen]Pedido finalizado: ${req.socket.remoteAddress}`);
            return res.status(201).json(close);
        } catch (error) {
            logger.error(`[kitchen]Erro ao finalizar pedido: ${error}-  ${req.socket.remoteAddress}`);
            return res.status(500).json(`${error}`);
        }
    },

}

export default controller;