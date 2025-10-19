import type { UserDTO } from '../dto/user.dto.js';
import { UserRepository } from '../repository/user.repository.js';
import { AuthService } from '../service/auth.service.js';
import { type Request, type Response } from "express";
import { verifyToken } from '../utils/verifyToken.js';
const userRepository = new UserRepository();
const authService = new AuthService(userRepository);

export class AuthController {

    constructor() { }


    public createUser = async (req: Request, res: Response) => {

        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ message: "Faltan datos requeridos" });
            }

            const userDTO: UserDTO = { name, email, password };
            const user = await authService.createUser(userDTO);

            res.status(201).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al crear usuario" });
        }

    }


    public authenticationUser = async (req: Request, res: Response) => {

        try {

            const { email, password } = req.body;

            if (!email || !password) return res.status(400).json({ message: "Gato" })

            const userAutentication = await authService.authenticationUser(email, password);

            const { user, accessToken, refreshToken } = userAutentication;


            res.cookie("accessToken", accessToken, {
                httpOnly: true
            })

            await authService.saveRefreshToken(user.email, refreshToken)

            return res.status(200).json({ user: { email: user.email } });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al iniciar session" });
        }
    }


    public newToken = async (req: Request, res: Response) => {

        try {
            const { email } = req.body;

            const user = await authService.getUser(email);

            if (!user || !user.refreshToken) throw new Error("Acceso denegado");

            try {
                verifyToken(user.refreshToken, "REFRESH_SECRET");
            } catch {
                return res.status(403).json({ message: "Refresh token inválido o expirado" });
            }

            const newToken = await authService.generateNewAcessToken(email);

            res.cookie("accessToken", newToken, {
                httpOnly: true
            })

            return res.status(200).json({ message: "Access token renovado" });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }

    }


    public pruebaRuta = async (req: Request, res: Response) => {
        res.json({ message: "Ruta segura" })
    }
}