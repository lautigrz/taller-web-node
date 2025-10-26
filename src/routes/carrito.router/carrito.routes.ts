import { Router } from "express";
import { CarritoController } from "../../controller/carrito.controller.js";


const carritoRouter = Router();
const carritoController = new CarritoController();

carritoRouter.post('/agregar',carritoController.agregarProductoAlCarrito.bind(carritoController));
carritoRouter.get('/:userId', carritoController.obtenerCarrito.bind(carritoController));
carritoRouter.post('/:userId', carritoController.crearCarrito.bind(carritoController));
carritoRouter.delete('/:carritoId/producto/:productoId',carritoController.eliminarProductoAlCarrito.bind(carritoController));
carritoRouter.delete('/:carritoId/limpiar',carritoController.limpiarCarrito.bind(carritoController));

export default carritoRouter;