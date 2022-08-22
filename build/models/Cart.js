"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cartSchema = new mongoose_1.Schema({
    cliente: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    items: [{
            type: mongoose_1.Schema.Types.ObjectId,
            required: true,
        }],
    total: {
        type: mongoose_1.Schema.Types.Number,
    },
    observacao: {
        type: mongoose_1.Schema.Types.String,
        required: false,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Carrinho", cartSchema);
