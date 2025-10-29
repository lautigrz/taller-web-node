import { Router } from "express";
import { ProductoController } from "../../controller/producto.controller.js";
import { upload } from "../../middlewares/multer.js";

const productoRouter = Router();
const productoController = new ProductoController();

productoRouter.get('/', productoController.getProductos.bind(productoController));
productoRouter.get('/:id', productoController.getProducto.bind(productoController));  
productoRouter.post("/", upload.array('imagenes'), productoController.crearProducto.bind(productoController));
productoRouter.put("/:id", productoController.actualizarProducto.bind(productoController));
productoRouter.delete("/:id", productoController.eliminarProducto.bind(productoController));

export default productoRouter;