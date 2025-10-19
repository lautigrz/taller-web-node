import e from "express";
import type { UserDTO } from "../dto/user.dto.js";
import type { UserRepository } from "../repository/user.repository.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";


export class AuthService {

    constructor(private userRepository:UserRepository){}

    async createUser(userDTO: UserDTO){

        return await this.userRepository.createUser(userDTO);

    }

    async authenticationUser(email: string, password: string){

        const user = await this.userRepository.authenticationUser(email, password);
        if(!user) throw new Error("Usuario no encontrado");

        const accessToken = generateAccessToken(user.email);
        const refreshToken = generateRefreshToken(user.email);

        return {user, accessToken, refreshToken};
    }

    async saveRefreshToken(email:string, refresh:string){
        return await this.userRepository.saveRefreshToken(email,refresh);
    }

    async getUser(email:string){
        return await this.userRepository.getUser(email);
    }

    async generateNewAcessToken(email:string){
        return await generateAccessToken(email);
    }


}