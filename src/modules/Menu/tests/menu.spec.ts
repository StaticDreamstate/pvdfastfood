import server from "supertest";
import App from "../../../infra/App";
import logger from "../../../infra/logger";

const codeExample = "0";
const nameExample = "Hot dog";

beforeAll(() => {
    logger.debug("[Módulo: Menu] Início da bateria de testes.")
});

afterAll(() => {
    logger.debug("[Módulo: Menu] Fim da bateria de testes.");
});

describe("Bateria de testes integrados", () => {

    logger.debug("Teste da rota GET: /menu");

    test("Obtém as informações dos primeiros cinco produtos", async () => {
        const app = new App();
        await app.setup({
            test: true,
        });
        const instance = app.getInstance();
        const response = await server(instance).get("/menu");
        expect(response.statusCode).toEqual(200);
        logger.debug(`[(get)/menu] Status da API: ${response.statusCode}`);
    });

    logger.debug("Teste da rota GET: /produto/:param");

    test("Busca do produto pelo código", async () => {
        const app = new App();
        await app.setup({
            test: true,
        });
        const instance = app.getInstance();
        const response = await server(instance).get(`/produto/${codeExample}`);
        expect(response.statusCode).toEqual(200);
        logger.debug(`[(get)/produto/:param] Status da API: ${response.statusCode}`);
    });

    test("Busca do produto pelo nome", async () => {
        const app = new App();
        await app.setup({
            test: true,
        });
        const instance = app.getInstance();
        const response = await server(instance).get(`/produto/${nameExample}`);
        expect(response.statusCode).toEqual(200);
        logger.debug(`[(get)/produto/:param] Status da API: ${response.statusCode}`);
    });

});