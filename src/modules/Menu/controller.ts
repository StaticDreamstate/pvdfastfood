import { Request, Response } from "express";
import Products from "../../models/Products";
import logger from "../../infra/logger";

const controller = {

    async menu(req: Request, res: Response) {
        try {
            const topMenu = await Products.find().sort({ created_at: -1 }).limit(5); 
            return res.status(200).json(topMenu);
        } catch (error) {
            logger.error(`[topMenu]Erro ao consultar o cardápio: ${error}-  ${req.socket.remoteAddress}`);
            return res.status(500).json(`${error}`);
        }
    },

    async search(req: Request, res: Response) {
        
        try {
            const { param } = req.params;
            if ( String(param).length > 1) {
                const nameCheck = await Products.find({nome: param}, {_id: 0, codigo: 1, nome: 1, descricao: 1, preco: 1});
                return res.status(200).json(nameCheck);
            }
            else {
                const codeCheck = await Products.find({codigo: param}, {_id: 0, codigo: 1, nome: 1, descricao: 1, preco: 1});
                return res.status(200).json(codeCheck);
            }

            return res.status(200).json(null);
        } catch (error) {
            logger.error(`[search]Erro ao buscar produto: ${error}-  ${req.socket.remoteAddress}`);
            return res.status(500).json(`${error}`);
        }
    },
}

export default controller;