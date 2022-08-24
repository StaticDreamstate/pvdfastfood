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
const Products_1 = __importDefault(require("../../../models/Products"));
const payload = {
    cliente: "Jack",
    items: "0,1",
    observacao: "Sem mostarda"
};
let itemsId = undefined || [];
let search;
let total = 0;
let orderId;
let pay = { pagamento: "Débito" };
function order() {
    return __awaiter(this, void 0, void 0, function* () {
        let itemsArr = payload.items.split(",");
        for (let i = 0; i < itemsArr.length; i++) {
            search = yield Products_1.default.findOne({ codigo: itemsArr[i] });
            total += Number(search.preco);
            itemsId[i] = search._id;
        }
        const newOrder = yield Cart_1.default.create({
            cliente: payload.cliente,
            items: itemsId,
            observacao: payload.observacao,
            total: total,
        });
        orderId = newOrder._id;
    });
}
beforeAll(() => {
    logger_1.default.debug("[Módulo: Finish] Início da bateria de testes.");
    order();
});
afterAll(() => {
    logger_1.default.debug("[Módulo: Finish] Fim da bateria de testes.");
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
    logger_1.default.debug("Teste da rota POST: /order/close/:id");
    test("Fecha o pedido e recebe o pagamento", () => __awaiter(void 0, void 0, void 0, function* () {
        const app = new App_1.default();
        yield app.setup({
            test: false,
        });
        const instance = app.getInstance();
        console.log(orderId);
        const response = yield (0, supertest_1.default)(instance).post(`/order/close/${orderId}`).send(pay);
        expect(response.statusCode).toEqual(201);
        logger_1.default.debug(`[(post)/order/close/:id] Status da API: ${response.statusCode}`);
    }));
    logger_1.default.debug("Teste da rota DELETE: /kitchen/:id");
    test("Baixa na cozinha", () => __awaiter(void 0, void 0, void 0, function* () {
        const app = new App_1.default();
        yield app.setup({
            test: true,
        });
        const instance = app.getInstance();
        const response = yield (0, supertest_1.default)(instance).delete(`/order/${orderId}`);
        expect(response.statusCode).toEqual(204);
        logger_1.default.debug(`[(delete)/kitchen/:id] Status da API: ${response.statusCode}`);
    }));
});
