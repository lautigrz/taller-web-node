
import { type Request, type Response } from "express";
import { ProductoRepository } from "../repository/producto.repository.js";
import { ProductoService } from "../service/producto.service.js";
import type { CreateProductDto } from "../dto/producto.dto.js";
import { LigaRepository } from "../repository/liga.repository.js";
import type { Filtro } from "../dto/filtro.interface.js";

const productoRepository = new ProductoRepository();
const ligaRepository = new LigaRepository();
const productoService = new ProductoService(productoRepository, ligaRepository);


export class ProductoController {

    public getProductos = async (req: Request, res: Response) => {

        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 12;

            const filters: Filtro = {
                deporte: req.query.deporte as string,
                categoria: req.query.categoria as string,
                liga: req.query.liga ? Number(req.query.liga) : undefined,
                equipo: req.query.equipo ? Number(req.query.equipo) : undefined,
                precioMax: req.query.precio ? Number(req.query.precio) : undefined,
            };

            const productos = await productoService.obtenerProductos(page, limit, filters);
            res.status(200).json(productos);
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Error al obtener productos", error });
        }
    }


    public getProducto = async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        if (isNaN(id)) return res.status(400).json("ID Inválido");

        try {
            const producto = await productoService.obtenerProductoPorId(id);
            if (!producto) return res.status(404).json({ message: "Producto no encontrado" });
            res.status(200).json(producto);
        } catch (error) {
            res.status(500).json({ message: "No se pudo obtener el producto", error });

        }

    }


    public crearProducto = async (req: Request, res: Response) => {

        try {

            const files = req.files as Express.Multer.File[] | undefined;

            const data: CreateProductDto = req.body;

            console.log('Datos del producto:', data);

            if (!files) { return }

            const algo = await productoService.crearProducto(data, files);

            const producto = await productoService.obtenerProductoPorId(algo.id);
            return res.status(201).json(producto);
        } catch (error: any) {
            console.error("Error en crearProducto:", error);
            res.status(500).json({ message: "No se pudo crear el producto", error })
        }

    }


    public actualizarProducto = async (req: Request, res: Response) => {

        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json("ID Invalido");

        try {
            const { nombre, descripcion, precio, stock, imagenUrl, genero, liga } = req.body;
            const productoActualizado = await productoService.actualizarProducto(id, {
                nombre,
                descripcion,
                precio,
                stock,
                imagenUrl,
                genero,
                liga
            });

            res.status(200).json(productoActualizado);

        } catch (error: any) {
            if (error.message === "Producto no existente") {
                return res.status(404).json({ message: "Producto no encontrado" });
            }

            res.status(500).json({ message: "No se pudo actualizar el producto", error });
        }


    }


    public cambiarEstadoProducto = async (req: Request, res: Response) => {

        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json("ID Invalido");


        try {

            await productoService.cambiarEstadoProducto(id, false);
            res.status(204).send();
        } catch (error: any) {
            if (error.message === "ProductoNoExiste") {
                return res.status(404).json({ message: "Producto no encontrado" });
            }
            res.status(500).json({ message: "No se pudo eliminar el producto", error });
        }
    }
    public getProductosDisabled = async (req: Request, res: Response) => {

        try {
            const productos = await productoService.findAllProductosDisabled();
            res.status(200).json(productos);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener productos", error });
        }
    }


}