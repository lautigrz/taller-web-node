
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
                lastname: userDTO.lastname,
                email: userDTO.email,
                direccion: userDTO.direccion,
                password: hashedPassword

            }
        })

        const { password, id,refreshToken, email, direccion,...userWithoutPassword } = user;

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

        if (!isValid) throw new Error("Ocurrio un error, intentelo de nuevo.");

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


    async updatePassword(id: number, newPassword: string) {
        const { hash } = bcrypt;
        const hashedPassword = await hash(newPassword, 10)
        return await prisma.user.update({
            where: { id },
            data: { password: hashedPassword }
        })
    }


}