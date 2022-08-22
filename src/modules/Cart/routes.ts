import { Router } from "express";
import controller from "./controller";

const routes = Router();

routes.post("/order", controller.order);
routes.put("/order/:id", controller.editOrder);
routes.delete("/order/:id", controller.cancelOrder);

export default routes;