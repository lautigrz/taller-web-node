import { type Request, type Response } from "express";
import { PedidoRepository } from "../repository/pedidos.repository.js";
import { PedidoService } from "../service/pedido.service.js";

const pedidoRepository = new PedidoRepository();
const pedidoService = new PedidoService(pedidoRepository);

export class PedidoController {
  async crearPedido(req: Request, res: Response) {
    try {
      const userEmail = req.user?.email; // middleware de auth
      const { productos, total, direccion } = req.body;

      if (!userEmail) {
        return res.status(401).json({ error: "Usuario no autenticado" });
      }

      if (!productos || productos.length === 0) {
        return res.status(400).json({ error: "Debe incluir al menos un producto" });
      }

      const pedido = await pedidoService.crearPedido(userEmail, productos, total, direccion || "");

      return res.status(201).json(pedido);

    } catch (error: any) {
      console.error("Error al crear pedido:", error.message || error);

      if (
        error.message.includes("Usuario no encontrado") ||
        error.message.includes("Algunos productos no existen")
      ) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async obtenerPedidosUsuario(req: Request, res: Response) {
    try {
      const userEmail = req.user?.email;

      if (!userEmail) {
        return res.status(401).json({ error: "Usuario no autenticado" });
      }

      const pedidos = await pedidoService.obtenerPedidosUsuario(userEmail);

      return res.status(200).json(pedidos);
    } catch (error: any) {
      console.error("Error al obtener pedidos:", error.message || error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}
