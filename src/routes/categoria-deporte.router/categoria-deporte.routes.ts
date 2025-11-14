import { Router } from "express";
import { CategoriaDeporteController } from "../../controller/categoria-deporte.controller.js";

const typeRouter = Router();
const controller = new CategoriaDeporteController();

typeRouter.get("/deporte",controller.getAllDeporte.bind(controller))
typeRouter.get("/categoria",controller.getAllCategoria.bind(controller))

export default typeRouter