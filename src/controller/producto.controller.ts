import {type Request, type Response } from "express";
import { ProductoRepository } from "../repository/producto.repository.js";
import { ProductoService } from "../service/producto.service.js";
import type { Genero } from "../enums/Genero.js";

const productoRepository = new ProductoRepository();
const productoService = new ProductoService(productoRepository);


export class ProductoController{

    public getProductos = async (req: Request, res:Response) =>{

        try{
            const productos = await productoService.obtenerProductos();
            res.status(200).json(productos);
        }catch(error){
            res.status(500).json({message: "Error al obtener productos", error});
        }
    }


    public getProducto = async (req:Request, res:Response) =>{  
        const id = Number(req.params.id);

        if(isNaN(id)) return res.status(400).json("ID Inválido");

        try{
            const producto = await productoService.obtenerProductoPorId(id);
            if(!producto) return res.status(404).json({message: "Producto no encontrado"});
            res.status(200).json(producto);
        }catch (error){
            res.status(500).json({message: "No se pudo obtener el producto", error});

        }
    
    }


    public crearProducto = async (req:Request, res:Response) =>{
    
        try{
            const {nombre, descripcion, precio, stock, imagenUrl, genero, liga} = req.body;

            const producto = await productoService.crearProducto({
                nombre,
                descripcion,
                precio,
                stock,
                imagenUrl,
                genero: genero as Genero,
                liga
            });

            res.status(201).json(producto);

        } catch (error: any){
            res.status(500).json({message: "No se pudo crear el producto", error})
        }
    
    }


    public actualizarProducto = async (req:Request, res:Response) =>{
    
        const id = Number(req.params.id);
        if(isNaN(id)) return res.status(400).json("ID Invalido");

        try{
            const {nombre, descripcion, precio, stock, imagenUrl, genero, liga} = req.body;
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

        } catch (error : any){
            if(error.message === "Producto no existente"){
                return res.status(404).json({message: "Producto no encontrado"});
            }

            res.status(500).json({message: "No se pudo actualizar el producto", error});
        }

        
    }


    public eliminarProducto = async (req:Request, res:Response) =>{
    
        const id = Number(req.params.id);
        if(isNaN(id)) return res.status(400).json("ID Invalido");


        try{
            await productoService.eliminarProducto(id);
            res.status(204).send();
        }catch (error: any) {
            if (error.message === "ProductoNoExiste") {
                return res.status(404).json({ message: "Producto no encontrado" });
            }
            res.status(500).json({ message: "No se pudo eliminar el producto", error });
        }
    }

}