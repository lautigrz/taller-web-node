import type { CarritoRepository } from "../repository/carrito.repository.js";

export class CarritoService{
    constructor(private carritoRepository:CarritoRepository){}

    async obtenerCarrito(userId:number){
        return await this.carritoRepository.findCarritoByUserId(userId);
    }

    async crearCarrito(userId:number){
        return await this.carritoRepository.createCarrito(userId);
    }

    async agregarProducto(carritoId:number, productoId:number, cantidad : number = 1){
        return await this.carritoRepository.addProductoToCarrito(carritoId, productoId, cantidad);
    }

    async removerProducto(carritoId: number, productoId:number){
        return await this.carritoRepository.removeProductoFromCarrito(carritoId, productoId);
    }

    async limpiarCarrito(carritoId:number){
        return await this.carritoRepository.limpiarCarrito(carritoId);
    }

}