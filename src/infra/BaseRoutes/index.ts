import { Router } from "express";
import startRoute from "../../modules/API/routes";
import productRoutes from "../../modules/Menu/routes";
import orderRoutes from "../../modules/Cart/routes";
import finishRoute from "../../modules/Finish/routes";

const routes = Router();

routes.use(startRoute);
routes.use(productRoutes);
routes.use(orderRoutes);
routes.use(finishRoute);

export default routes;