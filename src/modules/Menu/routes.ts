import { Router } from "express";
import controller from "./controller";

const routes = Router();

routes.get("/menu", controller.menu);
routes.get("/produto/:param", controller.search); 
export default routes;