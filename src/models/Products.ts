import { Schema, model } from "mongoose";

export interface IProduct {
    codigo: number;
    nome: string;
    preco: number;
    descricao: string;
}

const productSchema = new Schema<IProduct>(
    {
        codigo: {
          type: Schema.Types.Number,
          required: false,
          unique: true,
        },

        nome: {
            type: Schema.Types.String,
            required: true,
          },
          preco: {
            type: Schema.Types.Number,
            required: true,
          },
          descricao: {
            type: Schema.Types.String,
            required: true,
          },
    },
    { timestamps: true }
);

export default model<IProduct>("Produtos", productSchema);