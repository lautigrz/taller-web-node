import type { Genero } from "../enums/Genero.js";
import { prisma } from "../prisma.js";

export class ProductoRepository{

async findAllProductos(){

    return await prisma.producto.findMany(
        {
            include:{
                equipo:{
                    include:{liga : true}
                },
                imagenes:true
            }
        }
    );
}

async findProductoById(id: number){

    return await prisma.producto.findUnique({
        where: {id}});
}

async createProducto(data:{
    nombre: string;
    descripcion?: string;
    precio: number;
    stock?: number;
    genero?: Genero;
    equipoId: number;
    imagenes?: { url: string; orden?: number }[];
}) {
    return await prisma.producto.create({
        data: {
            ...data,
            imagenes: {
                create: data.imagenes || [], // crea imágenes si vienen, sino vacío
            },
        },
    });
}



async updateProducto(id:number, data:{
    nombre?:string;
    descripcion?:string;
    precio?:number;
    stock?:number;
    imagenUrl?:string;
    genero?:Genero;
    liga?:string;
}){

    return await prisma.producto.update({
        where: {id},
        data
    });

}

async deleteProducto(id:number){
    return await prisma.producto.delete({
        where: {id}
    })
}


}
