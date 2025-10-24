import { type Request, type Response, type NextFunction } from 'express'

import jwt from 'jsonwebtoken'
import { verifyToken } from '../utils/verifyToken.js';

interface UserToken extends jwt.JwtPayload {
    email: string;
}

export const jwtAuthorizationToken = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {


        const token = req.cookies?.accessToken;

        if (!token) throw new Error();


        const decodedToken: UserToken = verifyToken(token, "TOKEN_SECRET") as UserToken

        req.user = { email: decodedToken.email };

        next();

    } catch (error: any) {
        if (error.name === "TokenExpiredError") {
            console.log("Token expirado")
        }

        res.status(401).json({ message: "Token invalido!" });
    }
}