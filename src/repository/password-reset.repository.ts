import { prisma } from "../prisma.js"

export class PasswordResetRepository{
    
        async saveTokenResetPassword(userId: number, token: string){

        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

        const resetToken = await prisma.passwordResetToken.create({
            data: {
                userId,
                token,
                expiresAt
            }
        })

        return resetToken.token;
    }

    async findToken(token: string){
        return await prisma.passwordResetToken.findUnique({
            where: {token},
            include: {user: {
                select: {
                    id: true,
                    name: true
                }
            }}
        })
    }

    async findTokenForIdUser(userId: number){

        return await prisma.passwordResetToken.findFirst({
            where:{userId},
            select: {
                expiresAt: true
            }
        })
    }

    async deleteToken(token: string){
        return await prisma.passwordResetToken.delete({
            where: {token}
        })
    }
}