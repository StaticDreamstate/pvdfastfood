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
const codeExample = "0";
const nameExample = "Hot dog";
beforeAll(() => {
    logger_1.default.debug("[Módulo: Menu] Início da bateria de testes.");
});
afterAll(() => {
    logger_1.default.debug("[Módulo: Menu] Fim da bateria de testes.");
});
describe("Bateria de testes integrados", () => {
    logger_1.default.debug("Teste da rota GET: /menu");
    test("Obtém as informações dos primeiros cinco produtos", () => __awaiter(void 0, void 0, void 0, function* () {
        const app = new App_1.default();
        yield app.setup({
            test: true,
        });
        const instance = app.getInstance();
        const response = yield (0, supertest_1.default)(instance).get("/menu");
        expect(response.statusCode).toEqual(200);
        logger_1.default.debug(`[(get)/menu] Status da API: ${response.statusCode}`);
    }));
    logger_1.default.debug("Teste da rota GET: /produto/:param");
    test("Busca do produto pelo código", () => __awaiter(void 0, void 0, void 0, function* () {
        const app = new App_1.default();
        yield app.setup({
            test: true,
        });
        const instance = app.getInstance();
        const response = yield (0, supertest_1.default)(instance).get(`/produto/${codeExample}`);
        expect(response.statusCode).toEqual(200);
        logger_1.default.debug(`[(get)/produto/:param] Status da API: ${response.statusCode}`);
    }));
    test("Busca do produto pelo nome", () => __awaiter(void 0, void 0, void 0, function* () {
        const app = new App_1.default();
        yield app.setup({
            test: true,
        });
        const instance = app.getInstance();
        const response = yield (0, supertest_1.default)(instance).get(`/produto/${nameExample}`);
        expect(response.statusCode).toEqual(200);
        logger_1.default.debug(`[(get)/produto/:param] Status da API: ${response.statusCode}`);
    }));
});
