import { Router } from "express";
import authRouter from "./auth.router/auth.routes.js";
import carritoRouter from "./carrito.router/carrito.routes.js";
import productoRouter from "./producto.router/producto.routes.js";


export class AppRoutes {
    static get routes():Router{
        const router = Router();
        router.use('/auth', authRouter)
        router.use('/carrito', carritoRouter)
        router.use('/productos', productoRouter)
        return router;
    }
}