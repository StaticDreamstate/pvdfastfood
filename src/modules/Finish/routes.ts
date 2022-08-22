import { Router } from "express";
import controller from "./controller";

const routes = Router();

routes.post("/order/close/:id", controller.finish);

export default routes;