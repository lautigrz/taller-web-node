import { prisma } from "../prisma.js";


export class LigaRepository {

    async findAllLigas() {
        return await prisma.liga.findMany();
    }

   async findEquipoForLiga(idLiga: number) {
    return prisma.liga.findUnique({
        where: { id: idLiga },
        include: { 
            equipos:{
                orderBy: { name: 'asc' 
                }
            }
        }
    });
}


}