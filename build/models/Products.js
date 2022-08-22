"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    codigo: {
        type: mongoose_1.Schema.Types.Number,
        required: false,
        unique: true,
    },
    nome: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    preco: {
        type: mongoose_1.Schema.Types.Number,
        required: true,
    },
    descricao: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Produtos", productSchema);
