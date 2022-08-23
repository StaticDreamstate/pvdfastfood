"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("./env"));
const logger_1 = __importDefault(require("../logger"));
const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;
let printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    interface: env_1.default.PRINTER_INT,
    characterSet: 'PC860_PORTUGUESE',
    removeSpecialCharacters: false,
    lineCharacter: "=",
    options: {
        timeout: 5000
    }
});
function printClient(client, method, total) {
    let isConnected = printer.isPrinterConnected();
    if (isConnected) {
        printer.println(client);
        printer.println(method);
        printer.println(Number(total));
        printer.cut();
        try {
            let execute = printer.execute();
            logger_1.default.info(`[printClient]Impressão realizada`);
        }
        catch (error) {
            logger_1.default.error(`[printClient]Falha na impressão: ${error}`);
        }
    }
}
exports.default = printClient;
