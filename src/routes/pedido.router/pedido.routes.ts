import { Router } from "express";
import{ PedidoController } from "../../controller/pedido.controller.js";
import { jwtAuthorizationToken } from "../../middlewares/jwtAuthorization.js";

const pedidoRouter = Router();
const pedidoController = new PedidoController();

pedidoRouter.post('/', jwtAuthorizationToken, pedidoController.crearPedido.bind(pedidoController));
pedidoRouter.get('/mis-pedidos', jwtAuthorizationToken,  pedidoController.obtenerPedidosUsuario.bind(pedidoController));

export default pedidoRouter;
