
import path from "path";
import { readFile } from "fs/promises";
import type { UserDTO } from "../dto/user.dto.js";
import type { UserRepository } from "../repository/user.repository.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";
import type { SendEmail } from "./send-email.service.js";
import { fileURLToPath } from "url";
import type { PasswordResetService } from './password-reset.service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class AuthService {

    constructor(private userRepository: UserRepository, private sendEmail: SendEmail, private passwordReset: PasswordResetService) { }

    async createUser(userDTO: UserDTO) {

        return await this.userRepository.createUser(userDTO);

    }

    async authenticationUser(email: string, password: string) {

        const user = await this.userRepository.authenticationUser(email, password);
        if (!user) throw new Error("Usuario no encontrado");

        const accessToken = generateAccessToken(user.email);
        const refreshToken = generateRefreshToken(user.email);

        return { user, accessToken, refreshToken };
    }

    async saveRefreshToken(email: string, refresh: string) {
        return await this.userRepository.saveRefreshToken(email, refresh);
    }

    async getUser(email: string) {
        return await this.userRepository.getUser(email);
    }

    async generateNewAcessToken(email: string) {
        return await generateAccessToken(email);
    }

    async recoverPassword(email: string) {

        const userExist = await this.userRepository.getUser(email);

        if (!userExist) throw new Error("Email incorrecto");

        const templatePath = path.join(__dirname, "../templates/recover-password.html");
        let html = await readFile(templatePath, "utf-8");

        const token = await this.passwordReset.saveTokenResetPassword(userExist.id);

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

        html = html.replace("{{resetUrl}}", resetUrl);

        await this.sendEmail.sendMail({
            to: email,
            subject: "Recuperar contraseña",
            html: html
        })

        return { message: "Email de recuperación enviado si el correo existe" };
    }

    async verifyToken(token: string) {

        const tokenData = await this.validateToken(token);

        return tokenData.user;

    }

    async updatePassword(id: number, newPassword: string, token: string) {

        await this.validateToken(token)

        const user = await this.userRepository.updatePassword(id, newPassword);

        await this.passwordReset.deleteToken(token);
        return user.name;
    }

    private async validateToken(token: string) {
    const tokenData = await this.passwordReset.findToken(token);

    if (!tokenData) throw new Error("Token inválido");
    if (tokenData.expiresAt < new Date()) throw new Error("Token expirado");

    return tokenData;
}


}