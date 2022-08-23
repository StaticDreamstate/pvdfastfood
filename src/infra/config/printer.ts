import ENV from "./env";
import logger from "../logger";

const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;

let printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,            
    interface: ENV.PRINTER_INT,         
    characterSet: 'PC860_PORTUGUESE',   
    removeSpecialCharacters: false,     
    lineCharacter: "=",                 
    options: {                           
        timeout: 5000               
    }
});

function printClient(client: string, method: string, total: number) {

    let isConnected = printer.isPrinterConnected();

    if (isConnected) {
        printer.println(client);
        printer.println(method);
        printer.println(Number(total));
        printer.cut();
        
        try {
            let execute = printer.execute()
            logger.info(`[printClient]Impressão realizada`);
          } catch (error) {
            logger.error(`[printClient]Falha na impressão: ${error}`);
          }
    }

}

export default printClient;

