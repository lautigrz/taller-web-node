
import type { Filtro } from "../dto/filtro.interface.js";
import type { CreateProductDto } from "../dto/producto.dto.js";
import type { Genero } from "../enums/Genero.js";
import { prisma } from "../prisma.js";
import type { Producto } from "./models/producto.model.js";
import type { Prisma } from "@prisma/client";

export class ProductoRepository {

    async findAllProductos(page = 1, limit = 12, filtros: Filtro) {
        const skip = (page - 1) * limit;

        const where: any = {
            habilitado: true,
        };

        if (filtros.liga) {
            where.equipo = {
                ligaId: Number(filtros.liga)
            };
        }

        if (filtros.equipo) {
            where.equipoId = Number(filtros.equipo);
        }

        if (filtros.precioMax) {
            where.precio = {
                gte: Number(0),
                lte: Number(filtros.precioMax)
            }
             console.log(filtros.precioMax)
        }

       

        const [total, data] = await Promise.all([
            prisma.producto.count({ where }),
            prisma.producto.findMany({
                where,
                skip,
                take: limit,
                include: {
                    equipo: { include: { liga: true } },
                    imagenes: true
                },
                
            })
        ]);

        return {
            data,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                hasNextPage: page * limit < total,
                hasPrevPage: page > 1
            
            }
            
        };
    }


    async findAllProductosDisabled() {

        return await prisma.producto.findMany(
            {
                where: { habilitado: false },
                include: {
                    equipo: {
                        include: { liga: true }
                    },
                    imagenes: true
                }
            }
        );
    }

    async findProductoById(id: number) {
        return await prisma.producto.findUnique({
            where: { id },
            include: {
                equipo: {
                    include: { liga: true }
                },
                imagenes: true
            }
        });
    }


    async createProducto(producto: CreateProductDto, images: string[]) {
        return await prisma.producto.create({
            data: {
                titulo: producto.titulo ?? "Sin titulo",
                descripcion: producto.descripcion ?? "Sin descripcion",
                precio: producto.precio,
                cantidad: producto.cantidad ?? 0,
                equipoId: Number(producto.equipoId),
                imagenes: {
                    create: images.map(url => ({ url })),
                },
                tallas: (producto.tallasDisponibles && producto.tallasDisponibles.length > 0
                    ? {
                        connectOrCreate: producto.tallasDisponibles.map((t) => ({
                            where: { talla: t },
                            create: { talla: t },
                        })),
                    }
                    : undefined) as Prisma.TallaCreateNestedManyWithoutProductosInput,
            },
        });
    }



    async updateProducto(id: number, data: {
        nombre?: string;
        descripcion?: string;
        precio?: number;
        stock?: number;
        imagenUrl?: string;
        genero?: Genero;
        liga?: string;
    }) {

        return await prisma.producto.update({
            where: { id },
            data
        });

    }

    async cambiarEstadoProducto(id: number, estado: boolean) {
        return await prisma.producto.update({
            where: { id },
            data: { habilitado: estado }
        })
    }


}
