import server from "supertest";
import App from "../../../infra/App";
import logger from "../../../infra/logger";

beforeAll(() => {
    logger.debug("[Módulo: API] Início da bateria de testes.")
});

afterAll(() => {
    logger.debug("[Módulo: API] Fim da bateria de testes.");
});

describe("Bateria de testes integrados", () => {

    logger.debug("Teste da rota /");

    test("Verificar se a API está de pé", async () => {
        const app = new App();
        await app.setup({
            test: true,
        });
        const instance = app.getInstance();
        const response = await server(instance).get("/");
        expect(response.statusCode).toEqual(200);
        logger.debug(`[/] Status da API: ${response.statusCode}`);
    });

});