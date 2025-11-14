import { CategoriaDeporte } from "../repository/categoria-deporte.repository.js";
import { CategoriaDepporte } from "../service/categoria-deporte.service.js";
import { type Request, type Response } from "express";
const categoriaDeporteRepository = new CategoriaDeporte();
const categoriaDeporteService = new CategoriaDepporte(categoriaDeporteRepository);


export class CategoriaDeporteController {


    public getAllCategoria = async (req: Request, res: Response) => {
        try {
            const categorias = await categoriaDeporteService.getAllCategoria();
            return res.status(200).json(categorias);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error al obtener categorías", error });
        }
    }

    public getAllDeporte = async (req: Request, res: Response) => {
        try {
            const deportes = await categoriaDeporteService.getAllDeporte();
            return res.status(200).json(deportes);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error al obtener deportes", error });
        }
    }

}