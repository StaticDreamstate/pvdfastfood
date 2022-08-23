"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const App_1 = __importDefault(require("../../../infra/App"));
const logger_1 = __importDefault(require("../../../infra/logger"));
const Cart_1 = __importDefault(require("../../../models/Cart"));
let payload = {
    cliente: "Fake Shemp",
    items: "0,1",
    observacao: "Dobro de queijo",
};
let orderId;
beforeAll(() => {
    logger_1.default.debug("[Módulo: Cart] Início da bateria de testes.");
});
afterAll(() => {
    logger_1.default.debug("[Módulo: Cart] Fim da bateria de testes.");
});
describe("Bateria de testes integrados", () => {
    logger_1.default.debug("Teste da rota POST: /order");
    test("Inicia um novo pedido no carrinho", () => __awaiter(void 0, void 0, void 0, function* () {
        const app = new App_1.default();
        yield app.setup({
            test: true,
        });
        const instance = app.getInstance();
        const response = yield (0, supertest_1.default)(instance).post("/order").send(Object.assign({}, payload));
        expect(response.statusCode).toEqual(201);
        logger_1.default.debug(`[(post)/order] Status da API: ${response.statusCode}`);
    }));
    logger_1.default.debug("Teste da rota PUT: /order/:id");
    test("Edita um pedido existente", () => __awaiter(void 0, void 0, void 0, function* () {
        const app = new App_1.default();
        yield app.setup({
            test: true,
        });
        orderId = yield Cart_1.default.findOne({ nome: payload.cliente });
        payload.items = "0,1,2";
        payload.observacao = "Dobro de queijo e de cebola";
        const instance = app.getInstance();
        const response = yield (0, supertest_1.default)(instance).put(`/order/${orderId._id}`).send(payload);
        expect(response.statusCode).toEqual(201);
        logger_1.default.debug(`[(put)/order/:id] Status da API: ${response.statusCode}`);
    }));
    logger_1.default.debug("Teste da rota DELETE: /order/:id");
    test("Simulação de desistência do cliente", () => __awaiter(void 0, void 0, void 0, function* () {
        const app = new App_1.default();
        yield app.setup({
            test: true,
        });
        const instance = app.getInstance();
        const response = yield (0, supertest_1.default)(instance).delete(`/order/${orderId._id}`).send(payload);
        expect(response.statusCode).toEqual(204);
        logger_1.default.debug(`[(delete)/order/:id] Status da API: ${response.statusCode}`);
    }));
});
