
import { prisma } from "../prisma.js"
import type { UserDTO } from '../dto/user.dto.js';
import bcrypt from 'bcryptjs';


export class UserRepository {


    async createUser(userDTO: UserDTO) {
        const { hash } = bcrypt;
        const hashedPassword = await hash(userDTO.password, 10)

        const user = await prisma.user.create({
            data: {
                name: userDTO.name,
                email: userDTO.email,
                password: hashedPassword

            }
        })

        const { password, ...userWithoutPassword } = user;

        return userWithoutPassword;
    }


    async authenticationUser(email: string, password: string) {
        const { compare } = bcrypt;

        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            throw new Error("Usuario no encontrado")
        }

        const isValid = await compare(password, user.password);

        if (!isValid) throw new Error("Contraseña incorrecta");

        const { password: _, ...userWithoutPassword } = user;

        return userWithoutPassword;
    }

    async saveRefreshToken(email: string, refreshToken: string) {

        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) throw new Error("Usuario no encontrado")


        const updatedUser = await prisma.user.update({
            where: { email },
            data: { refreshToken: refreshToken }
        });

        return updatedUser;


    }


    async getUser(email: string) {

        return await prisma.user.findUnique({
            where: { email }
        })
    }

}