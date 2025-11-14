import { CategoriaDeporte } from "../repository/categoria-deporte.repository.js";

export class CategoriaDepporte{
    constructor( private categeoriaDeporte: CategoriaDeporte){}


    async getAllCategoria(){
        this.categeoriaDeporte.getAllCategoria();
    }

    async getAllDeporte(){
        this.categeoriaDeporte.getAllDeporte();
    }

}