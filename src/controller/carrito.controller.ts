import { CarritoRepository } from "../repository/carrito.repository.js";
import { CarritoService } from "../service/carrito.service.js";
import {type Request, type Response } from "express";


const carritoRepository = new CarritoRepository();
const carritoService = new CarritoService(carritoRepository);


export class CarritoController{
    constructor () { }


    public obtenerCarrito = async (req: Request, res: Response) =>{
       try{
        const userId = Number(req.params.userId);
        
        if(isNaN(userId)){
            return res.status(400).json({message: "ID de usuario Inválido"});
        }
        const carrito = await carritoService.obtenerCarrito(userId);
        res.status(200).json(carrito);
        
        }catch (error){
            res.status(500).json({message : "No se pudo obtener el carrito", error});
        }
    };

    public crearCarrito = async (req:Request, res:Response) =>{
        try{
            const userId = Number(req.params.userId);
            
            if(isNaN(userId)){
                return res.status(400).json({message: "ID de usuario Inválidoooo"});
            }
            const nuevoCarrito = await carritoService.crearCarrito(userId);
            res.status(201).json(nuevoCarrito);

        }catch (error){
            res.status(500).json({message: "Error al crear el carrito", error});
        }
    };


    public agregarProductoAlCarrito = async (req:Request, res:Response) =>{
        try{
            const {carritoId, productoId, cantidad}  =req.body;

            if(!carritoId || !productoId){
                return res.status(400).json({message: "Faltan datos requeridos"});
            }

            if (cantidad !== undefined && (isNaN(cantidad) || cantidad <= 0)) {
            return res.status(400).json({ message: "Cantidad inválida" });
            }

            const productoAgregado = await carritoService.agregarProducto(carritoId, productoId, cantidad);
            res.status(201).json(productoAgregado);
        }catch (error){
            res.status(500).json({message: "Error al agregar el producto al carrito", error});
        }

    };

    public eliminarProductoAlCarrito = async (req:Request, res:Response) =>{
        
        try{
            const carritoId = Number(req.params.carritoId);
            const productoId = Number(req.params.productoId);

            if(isNaN(carritoId) || isNaN(productoId)){
                return res.status(400).json({message: "ID de carrito o producto Inválido"});
            }

            await carritoService.removerProducto(carritoId, productoId);
            res.status(204).send();
        }catch(error){
            res.status(500).json({message: "Error al eliminar el producto al carrito", error});
        }

    };


    public limpiarCarrito = async (req:Request, res:Response) =>{
        try{
            const carritoId = Number(req.params.carritoId);

            if(isNaN(carritoId)){
                return res.status(400).json({message: "ID de carrito Inválido"});
            }
            
            await carritoService.limpiarCarrito(carritoId);
            res.status(204).send();
        }catch(error){
            res.status(500).json({message: "Error al limpiar el carrito", error});
        }


    }



}