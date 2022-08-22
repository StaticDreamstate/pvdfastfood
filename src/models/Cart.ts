import { Schema, model } from "mongoose";
import Products, { IProduct } from "./Products";

export interface ICart {
    cliente: string;
    items: Schema.Types.ObjectId[] | IProduct[];
    total: number;
    observacao: string;
}

const cartSchema = new Schema<ICart>(
    {
        cliente: {
            type: Schema.Types.String,
            required: true,
        },

        items: [{
                type: Schema.Types.ObjectId,
                required: true,             
            }],

        total: {
            type: Schema.Types.Number,
        },

        observacao: {
            type: Schema.Types.String,
            required: false,
        },
    },
    { timestamps: true }
);

export default model<ICart>("Carrinho", cartSchema);