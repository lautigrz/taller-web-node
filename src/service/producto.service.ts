import { Genero } from "../enums/Genero.js";
import type { ProductoRepository } from "../repository/producto.repository.js";

export class ProductoService{

    constructor(private productoRepository:ProductoRepository){}

    async obtenerProductos(){
        return await this.productoRepository.findAllProductos();
    }

    async obtenerProductoPorId(id:number){
        return await this.productoRepository.findProductoById(id);
    }

    async crearProducto(data:{
        nombre?:string;
        descripcion?:string;
        precio?:number;
        stock?:number;
        imagenUrl?:string;
        genero?:Genero;
        liga?:string;
    }){
        const {nombre, precio, stock, genero, liga} = data;

        if (!nombre || typeof nombre !== 'string') {
            throw new Error('El nombre es obligatorio y debe ser un string');
        }

        if (precio === undefined || typeof precio !== 'number') {
            throw new Error('El precio es obligatorio y debe ser un número');
        }

        if (stock !== undefined && isNaN(Number(stock))) {
            throw new Error('El stock debe ser un número válido');
        }

        if (genero !== undefined && !Object.values(Genero).includes(genero)) {
            throw new Error('Genero inválido');
        }

        return;


    }


    async actualizarProducto(id:number, data:{
        nombre?:string;
        descripcion?:string;
        precio?:number;
        stock?:number;
        imagenUrl?:string;
        genero?:Genero;
        liga?:string;
    }){
        return await this.productoRepository.updateProducto(id, data);
    }

    async eliminarProducto(id:number){
     
        try{

            return await this.productoRepository.deleteProducto(id);
        } catch(error: any){
            if(error.code === "P2025"){
                throw new Error("Producto no existente");
            }
            throw error;
        }
     
    }


}