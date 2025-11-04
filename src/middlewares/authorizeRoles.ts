import type { Request, Response, NextFunction } from "express";
import type { AuthRequest } from "../interfaces/auth-request.js";

export const authorizeRoles = (...rolesPermitidos: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            res.status(401).json({ message: "Usuario no autenticado" });
            return;
        }

        const rolUsuario = req.user.rol;

        if (!rolesPermitidos.includes(rolUsuario)) {
            res.status(403).json({ message: "Acceso denegado" });
            return
        }

        next();
    };
};