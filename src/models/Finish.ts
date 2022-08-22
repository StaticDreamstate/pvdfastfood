import { Schema, model } from "mongoose";
import Cart, { ICart } from "./Cart";

export interface IFinish {
    id_pedido: Schema.Types.ObjectId | ICart;
    cliente: string;
    pagamento: string;
    total: number;
    recebido: number;
    troco: number;
}

const finishSchema = new Schema<IFinish>(
    {
        id_pedido: {
            type: Schema.Types.ObjectId,
            required: true,
        },

        cliente: {
            type: Schema.Types.String,
            required: true,
        },

        pagamento: {
            type: Schema.Types.String,
            required: true,
        },

        total: {
            type: Schema.Types.Number,
        },

        recebido: {
            type: Schema.Types.Number,
        },

        troco: {
            type: Schema.Types.Number,
        },

    });

export default model<IFinish>("Finalizar", finishSchema);