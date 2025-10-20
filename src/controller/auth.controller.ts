
import type { UserDTO } from '../dto/user.dto.js';
import { UserRepository } from '../repository/user.repository.js';
import { AuthService } from '../service/auth.service.js';
import { type Request, type Response } from "express";
import { verifyToken } from '../utils/verifyToken.js';
import { SendEmail } from '../service/send-email.service.js';
import { PasswordResetService } from '../service/password-reset.service.js';
import { PasswordResetRepository } from '../repository/password-reset.repository.js';
const userRepository = new UserRepository();
const passoworResetRepository = new PasswordResetRepository();
const passwordResetService = new PasswordResetService(passoworResetRepository)
const sendEmail = new SendEmail();
const authService = new AuthService(userRepository, sendEmail, passwordResetService);

export class AuthController {

    constructor() {}


    public createUser = async (req: Request, res: Response) => {

        try {
            const { name, email, lastname, direccion, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ message: "Faltan datos requeridos" });
            }

            const userDTO: UserDTO = { name, email, lastname, direccion, password };
            const user = await authService.createUser(userDTO);

            res.status(201).json(user);
        } catch (error) {

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

        } catch (error: any) {
            res.status(401).json(error.message);
        }
    }


    public newToken = async (req: Request, res: Response) => {

        try {
            const { email } = req.body;

            const user = await authService.getUser(email);

            if (!user || !user.refreshToken) return res.status(401).json({ message: "Acceso denegado" })

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

    public recoverPassword = async (req: Request, res: Response) => {

        try {
            const { email } = req.body;

            if (!email) return res.status(400).json({ message: "Email vacio" })
            const message = await authService.recoverPassword(email);
            return res.status(200).json(message);
        } catch (error: any) {
            return res.status(401).json({ message: error.message })
        }
    }

    public verifyToken = async (req: Request, res: Response) => {

        try {

            const token = req.query.token as string;

            if (!token) return res.status(401).json({ message: "Token invalido" })


            const tokenVerificado = await authService.verifyToken(token);

            if (!tokenVerificado) return res.status(401).json({ message: "Ocurrio un error en la verificacion del token" });

            return res.status(200).json(tokenVerificado);

        } catch (error: any) {
            return res.status(400).json({ message: error.message });

        }


    }


    public updatePassword = async (req: Request, res: Response) => {

        try {
            const { id, name, newPassword, confirmPassword, token } = req.body;

            if (!id || !name || !newPassword || !confirmPassword) return res.status(400).json({ message: "Error" })

            if (newPassword != confirmPassword) return res.status(400).json({ message: "Contraseñas invalidad" });

            const update = await authService.updatePassword(id, newPassword, token);

            return res.status(200).json(update);
        } catch (error: any) {
            return res.status(400).json(error.message)
        }

    }
}