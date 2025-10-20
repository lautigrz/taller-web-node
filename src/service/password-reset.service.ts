import type { PasswordResetRepository } from "../repository/password-reset.repository.js";


export class PasswordResetService{

    constructor(private passwordReset: PasswordResetRepository){}


     async saveTokenResetPassword(userId: number){
        const token = "sd1da";
    
        return await this.passwordReset.saveTokenResetPassword(userId,token);
     }

     async findToken(token: string){
        return await this.passwordReset.findToken(token);
     }

     async deleteToken(token: string){

        return await this.passwordReset.deleteToken(token);
     }

}