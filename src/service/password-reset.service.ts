import type { PasswordResetRepository } from "../repository/password-reset.repository.js";
import crypto from 'crypto';

export class PasswordResetService{

    constructor(private passwordReset: PasswordResetRepository){}


     async saveTokenResetPassword(userId: number){

      const lastTokenUser = await this.passwordReset.findTokenForIdUser(userId);

      if(lastTokenUser && lastTokenUser.expiresAt > new Date()) throw new Error("Ya hemos enviado un codigo de verificacion a su bandeja de correo electronico.")
      

        const token = crypto.randomBytes(8).toString('hex')
    
        return await this.passwordReset.saveTokenResetPassword(userId,token);
     }

     async findToken(token: string){
        return await this.passwordReset.findToken(token);
     }

     async deleteToken(token: string){

        return await this.passwordReset.deleteToken(token);
     }

}