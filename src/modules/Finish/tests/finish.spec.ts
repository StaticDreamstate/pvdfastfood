import server from "supertest";
import App from "../../../infra/App";
import logger from "../../../infra/logger";
import Cart from "../../../models/Cart";
import Products from "../../../models/Products";

const payload:any = {
    cliente: "Jack",
    items: "0,1",
    observacao: "Sem mostarda"
}

let itemsId: Array<String> = undefined || [];
let search: any;
let total: number = 0;
let orderId:any;
let pay = {pagamento: "Débito" };

async function order() {
let itemsArr = payload.items.split(",");
for (let i = 0; i < itemsArr.length; i++) {
        search = await Products.findOne({ codigo: itemsArr[i] });
        total += Number(search.preco);
        itemsId[i] = search._id;
    }

const newOrder = await Cart.create({
    cliente: payload.cliente,
    items: itemsId,
    observacao: payload.observacao,
    total: total,
});

orderId = newOrder._id;
}

beforeAll(() => {
    logger.debug("[Módulo: Finish] Início da bateria de testes.");
    order();
});

afterAll(() => {
    logger.debug("[Módulo: Finish] Fim da bateria de testes.");
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

    logger.debug("Teste da rota POST: /order/close/:id");

    test("Fecha o pedido e recebe o pagamento", async () => {
        
        const app = new App();
        await app.setup({
            test: false,
        });
        const instance = app.getInstance();
        console.log(orderId);
        const response = await server(instance).post(`/order/close/${orderId}`).send(pay);
        expect(response.statusCode).toEqual(201);
        logger.debug(`[(post)/order/close/:id] Status da API: ${response.statusCode}`);
    });

    logger.debug("Teste da rota DELETE: /kitchen/:id");

    test("Baixa na cozinha", async () => {
        const app = new App();
        await app.setup({
            test: true,
        });

        const instance = app.getInstance();
        const response = await server(instance).delete(`/order/${orderId}`);
        expect(response.statusCode).toEqual(204);
        logger.debug(`[(delete)/kitchen/:id] Status da API: ${response.statusCode}`);
    });

});