import { Router } from "express";
import authRouter from "./auth.router/auth.routes.js";

export class AppRoutes {
    static get routes():Router{
        const router = Router();
        router.use('/auth', authRouter)
        return router;
    }
}