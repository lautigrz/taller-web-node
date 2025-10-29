import type { LigaRepository } from "../repository/liga.repository.js";

export class LigaService{
    constructor(private ligaRepository: LigaRepository){}


    async findAllLiga(){
        return await this.ligaRepository.findAllLigas();
    }

     async findEquipoForLiga(idLiga: number){
        return await this.ligaRepository.findEquipoForLiga(idLiga);
    }

    async obtenerLigaYEquipo(idLiga: number, idEquipo: number) {
    // Obtiene la liga con sus equipos
    const liga = await this.ligaRepository.findEquipoForLiga(idLiga) // asumimos que devuelve algo tipo { id, name, equipos: Equipo[] }

    if (!liga) return null;

    // Encontrar el equipo dentro de la liga
   

    return 
}






}