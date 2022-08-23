import server from "supertest";
import App from "../../../infra/App";
import logger from "../../../infra/logger";
import Cart from "../../../models/Cart";

let payload: any = {
    cliente: "Fake Shemp",
    items: "0,1",
    observacao: "Dobro de queijo",
}

let orderId: any;

beforeAll(() => {
    logger.debug("[Módulo: Cart] Início da bateria de testes.")
});

afterAll(() => {
    logger.debug("[Módulo: Cart] Fim da bateria de testes.");
});

describe("Bateria de testes integrados", () => {

    logger.debug("Teste da rota POST: /order");

    test("Inicia um novo pedido no carrinho", async () => {
        const app = new App();
        await app.setup({
            test: true,
        });
        const instance = app.getInstance();
        const response = await server(instance).post("/order").send({
            ...payload,
        });
        expect(response.statusCode).toEqual(201);
        logger.debug(`[(post)/order] Status da API: ${response.statusCode}`);
    });


    logger.debug("Teste da rota PUT: /order/:id");

    test("Edita um pedido existente", async () => {
        const app = new App();
        await app.setup({
            test: true,
        });
        orderId = await Cart.findOne({ nome: payload.cliente });
        payload.items = "0,1,2";
        payload.observacao = "Dobro de queijo e de cebola";
        const instance = app.getInstance();
        const response = await server(instance).put(`/order/${orderId._id}`).send(payload);
        expect(response.statusCode).toEqual(201);
        logger.debug(`[(put)/order/:id] Status da API: ${response.statusCode}`);
    });

    logger.debug("Teste da rota DELETE: /order/:id");

    test("Simulação de desistência do cliente", async () => {
        const app = new App();
        await app.setup({
            test: true,
        });

        const instance = app.getInstance();
        const response = await server(instance).delete(`/order/${orderId._id}`).send(payload);
        expect(response.statusCode).toEqual(204);
        logger.debug(`[(delete)/order/:id] Status da API: ${response.statusCode}`);
    });

});