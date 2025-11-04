import { Router } from "express";
import { LigaController } from "../../controller/liga.controller.js";
import { jwtAuthorizationToken } from "../../middlewares/jwtAuthorization.js";
import { authorizeRoles } from "../../middlewares/authorizeRoles.js";

const ligaRouter = Router();
const controller = new LigaController()

ligaRouter.get('/', jwtAuthorizationToken, authorizeRoles("ADMIN"), controller.obtenerLigas.bind(controller));
ligaRouter.get('/:id', jwtAuthorizationToken, authorizeRoles("ADMIN"), controller.obtenerEquiposPorLigas.bind(controller));

export default ligaRouter