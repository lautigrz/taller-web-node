import type { Equipo } from "../dto/equipo.dto.js";
import { LigaRepository } from "../repository/liga.repository.js";
import { LigaService } from "../service/liga.service.js";
import { type Request, type Response } from "express";
const ligaRepository = new LigaRepository();
const ligaService = new LigaService(ligaRepository);

export class LigaController {

    constructor() { }



    public obtenerLigas = async (req: Request, res: Response) => {
        try {
            const ligas = await ligaService.findAllLiga();
            return res.status(200).json(ligas)
        } catch (error) {
            res.status(401).json({ message: "error, " })
        }
    }

    public obtenerEquiposPorLigas = async (req: Request, res: Response) => {
        try {
            const idLiga = Number(req.params.id);

            const liga = await ligaService.findEquipoForLiga(idLiga);

            if (!liga) {
          
                throw new Error('Liga no encontrada');
            }
       
            const equipos: Equipo[] = liga.equipos;

            return res.status(200).json(equipos)
        } catch (error) {
            res.status(401).json({ message: "error, " })
        }
    }
}