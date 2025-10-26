import { prisma } from "../prisma.js";

export class CarritoRepository{

async findCarritoByUserId(userId:number){

    return await prisma.carrito.findFirst({
        where:{userId, activo:true},
      include: { productos: { include: { producto: true } } }
    });
}

async createCarrito(userId:number){

    return await prisma.carrito.create({
        data:{userId}});
}

async addProductoToCarrito(carritoId:number, productoId:number, cantidad: number=1){

   
    const existente = await prisma.carritoProducto.findUnique({
      where: { carritoId_productoId: { carritoId, productoId } },
      include: { producto: true }
    });

    if(existente){
        const nuevaCantidad = existente.cantidad + cantidad;
        const nuevoSubtotal = nuevaCantidad * Number(existente.producto.precio);

        return await prisma.carritoProducto.update({
            where:{carritoId_productoId:{carritoId, productoId}},
            data:{
                cantidad: nuevaCantidad,
                subtotal: nuevoSubtotal
            },
            include: { producto: true }
        });
    }

    const producto = await prisma.producto.findUnique({ where: { id: productoId } });
    if (!producto) throw new Error("Producto no encontrado");

    return await prisma.carritoProducto.create({
        data: { carritoId, productoId, cantidad, subtotal: cantidad * Number(producto.precio) },
        include: { producto: true }
    });
}


async removeProductoFromCarrito(carritoId:number, productoId:number){
    return await prisma.carritoProducto.delete({
        where: { carritoId_productoId: { carritoId, productoId } }
    })

}

async limpiarCarrito(carritoId:number){
   return await prisma.carritoProducto.deleteMany({
      where: { carritoId }
    });
    }
}



