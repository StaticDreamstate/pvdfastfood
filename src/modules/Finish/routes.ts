import { Router } from "express";
import controller from "./controller";

const routes = Router();

routes.post("/order/close/:id", controller.finish);
routes.delete("/kitchen/:id", controller.kitchen);

export default routes;