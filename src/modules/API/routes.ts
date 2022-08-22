import { Router } from "express";
import controller from "./controller";

const routes = Router();

routes.get("/", controller.start);

export default routes;