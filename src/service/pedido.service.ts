import type { PedidoRepository } from "../repository/pedidos.repository.js";

export class PedidoService{
    constructor(private pedidoRepository: PedidoRepository){}

     async crearPedido(
    userEmail: string,
    productos: { productoId: number; cantidad: number; talla: string; precioUnitario: number }[],
    total: number,
    direccion: string
  ) {
    try {
      const pedido = await this.pedidoRepository.crearPedido(userEmail, productos, total, direccion);

      const productosConSubtotal = pedido.productos.map(p => ({
        ...p,
        subtotal: Number(p.precioUnitario) * p.cantidad
      }));

      return { ...pedido, productos: productosConSubtotal };
    } catch (error) {
      throw new Error("Error interno al crear pedido");
    }
  }

  async obtenerPedidosUsuario(userId: number) {
    const pedidos = await this.pedidoRepository.obtenerPedidosPorUsuario(userId);

    return pedidos.map(pedido => ({
      ...pedido,
      productos: pedido.productos.map(p => ({
        ...p,
        subtotal: Number(p.precioUnitario) * p.cantidad
      }))
    }));

    }}