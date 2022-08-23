import { Request, Response } from "express";
import logger from "../../infra/logger";
import Cart from "../../models/Cart";
import Products from "../../models/Products";

let itemsId: Array<String> = undefined || [];
let search: any;
let total: number = 0;

const controller = {

    async order(req: Request, res: Response) {
        try {
            const { cliente, items, observacao } = req.body;

            let itemsArr = items.split(",");
            for (let i = 0; i < itemsArr.length; i++) {
                if (itemsArr[i].length > 1) {
                    search = await Products.findOne({ nome: itemsArr[i] });
                    total += Number(search.preco);
                    itemsId[i] = search._id;
                }
                else {
                    search = await Products.findOne({ codigo: itemsArr[i] });
                    total += Number(search.preco);
                    itemsId[i] = search._id;
                }
            }

            const newOrder = await Cart.create({
                cliente: cliente,
                items: itemsId,
                observacao: observacao,
                total: total,
            });

            logger.info(`[order]Pedido aberto: ${req.socket.remoteAddress}`);
            return res.status(201).json(newOrder);
        } catch (error) {
            logger.error(`[order]Erro ao abrir pedido: ${error}-  ${req.socket.remoteAddress}`);
            return res.status(500).json(`${error}`);
        }
    },

    async editOrder(req: Request, res: Response) {
        try {
            const { cliente, items, observacao } = req.body;

            const { id } = req.params;

            let itemsArr = items.split(",");
            for (let i = 0; i < itemsArr.length; i++) {
                if (itemsArr[i].length > 1) {
                    search = await Products.findOne({ nome: itemsArr[i] });
                    total += Number(search.preco);
                    itemsId[i] = search._id;
                }
                else {
                    search = await Products.findOne({ codigo: itemsArr[i] });
                    total += Number(search.preco);
                    itemsId[i] = search._id;
                }
            }

            const check = await Cart.findById(id);

            if (!check) {
                logger.error(`[editOrder]Pedido não encontrado: ${req.socket.remoteAddress}`);
                return res.status(404).json("Pedido não encontrado");
            }

            if (Object.keys(req.body).length === 0) {
                logger.error(`[editOrder]Corpo vazio: ${req.socket.remoteAddress}`);
                return res.status(400).json("Dados insuficientes para Atualização");
            }

            const modifyOrder = await Cart.findOneAndUpdate(
                { _id: id },
                {
                    cliente: cliente,
                    items: itemsId,
                    observacao: observacao,
                    total: total,
                },
                {
                    new: true,
                }
            );

            return res.status(201).json(modifyOrder);

        } catch (error) {
            logger.error(`[editPlan]Erro ao editar o plano: ${error}-  ${req.socket.remoteAddress}`);
            return res.status(500).json(`${error}`);
        }
    },

    async cancelOrder(req: Request, res: Response) {
        try {
            const { id } = req.params;

            await Cart.deleteOne({ _id: id });

            return res.sendStatus(204);
        } catch (error) {
            logger.error(`[cancelOrder]Erro ao deletar pedido: ${error}-  ${req.socket.remoteAddress}`);
            return res.status(500).json(`${error}`);
        }
    },
}

export default controller;