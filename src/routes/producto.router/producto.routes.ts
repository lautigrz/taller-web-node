import { Router } from "express";
import { ProductoController } from "../../controller/producto.controller.js";
import { upload } from "../../middlewares/multer.js";
import { authorizeRoles } from "../../middlewares/authorizeRoles.js";
import { jwtAuthorizationToken } from "../../middlewares/jwtAuthorization.js";

const productoRouter = Router();
const productoController = new ProductoController();

productoRouter.get('/disabled-products',jwtAuthorizationToken, authorizeRoles("ADMIN"), productoController.getProductosDisabled.bind(productoController));
productoRouter.put("/change-state/:id", jwtAuthorizationToken, authorizeRoles("ADMIN"), productoController.cambiarEstadoProducto.bind(productoController));
productoRouter.post("/", jwtAuthorizationToken, authorizeRoles("ADMIN"), upload.array('imagenes'), productoController.crearProducto.bind(productoController));
productoRouter.put("/:id", productoController.actualizarProducto.bind(productoController));
productoRouter.get('/', productoController.getProductos.bind(productoController));
productoRouter.get('/:id', productoController.getProducto.bind(productoController));

export default productoRouter;