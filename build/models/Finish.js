"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const finishSchema = new mongoose_1.Schema({
    id_pedido: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    cliente: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    pagamento: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    total: {
        type: mongoose_1.Schema.Types.Number,
    },
    recebido: {
        type: mongoose_1.Schema.Types.Number,
    },
    troco: {
        type: mongoose_1.Schema.Types.Number,
    },
});
exports.default = (0, mongoose_1.model)("Finalizar", finishSchema);
