import { Router } from "express";
import { LigaController } from "../../controller/liga.controller.js";

const ligaRouter = Router();
const controller = new LigaController()

ligaRouter.get('/', controller.obtenerLigas.bind(controller));
ligaRouter.get('/:id', controller.obtenerEquiposPorLigas.bind(controller));

export default ligaRouter