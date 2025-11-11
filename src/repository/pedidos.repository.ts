import { prisma } from "../prisma.js";



export class PedidoRepository {
  async crearPedido(
    userEmail: string,
    productos: { productoId: number; cantidad: number; talla: string; precioUnitario: number }[],
    total: number,
    direccion: string
  ) {
    const user = await prisma.user.findUnique({ where: { email: userEmail } });
    if (!user) throw new Error("Usuario no encontrado");

    const pedido = await prisma.pedido.create({
      data: {
        userId: user.id,
        total,
        direccion,
        productos: {
          create: productos.map(p => ({
            productoId: p.productoId,
            cantidad: p.cantidad,
            talla: p.talla,
            precioUnitario: p.precioUnitario
          }))
        }
      },
      include: {
        productos: {
          include: { producto: true }
        }
      }
    });

    return pedido;
  }

  async obtenerPedidosPorUsuario(userEmail: string) {
    const user = await prisma.user.findUnique({ where: { email: userEmail } });
    if (!user) throw new Error("Usuario no encontrado");

    return await prisma.pedido.findMany({
      where: {  userId: user.id  },
      include: {
        productos: {
          include: { producto: true }
        }
      },
      orderBy: { creadoEn: 'desc' }
    });
    }

}

