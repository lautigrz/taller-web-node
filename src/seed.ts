import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {

    const premier = await prisma.liga.create({
        data: {
            name: 'Premier League',
            icon: 'https://mcdn.wallpapersafari.com/medium/10/22/q8ePzp.jpg', // icono genérico, puede ser cualquier url
        },
    });

    // Crear equipos
    const liverpool = await prisma.equipo.create({
        data: {
            name: 'Liverpool',
            icon: 'liverpool.png',
            ligaId: premier.id,
        },
    });

    const arsenal = await prisma.equipo.create({
        data: {
            name: 'Arsenal',
            icon: 'arsenal.png',
            ligaId: premier.id,
        },
    });

    // Crear productos para Liverpool
    const prodLiverpool1 = await prisma.producto.create({
        data: {
            nombre: 'Camiseta Local Liverpool 23/24',
            descripcion: 'Camiseta oficial local temporada 23/24',
            precio: 120.99,
            stock: 10,
            equipoId: liverpool.id,
            imagenes: {
                create: [
                    { url: '/images/premier-league/liverpool/liverpool-1-2019-2020.webp', orden: 1 },
                    { url: '/images/premier-league/liverpool/liverpool-2-2019-2020.webp', orden: 2 },
                    { url: '/images/premier-league/liverpool/liverpool-3-2019-2020.webp', orden: 3 },
                ],
            },
        },
    });

    // Crear productos para Arsenal
    const prodArsenal1 = await prisma.producto.create({
        data: {
            nombre: 'Camiseta Local Arsenal 23/24',
            descripcion: 'Camiseta oficial local temporada 23/24',
            precio: 115.50,
            stock: 8,
            equipoId: arsenal.id,
            imagenes: {
                create: [
                    { url: '/images/premier-league/arsenal/arsenal-1-2016-2017.webp', orden: 1 },
                    { url: '/images/premier-league/arsenal/arsenal-2-2016-2017.webp', orden: 2 },
                    { url: '/images/premier-league/arsenal/arsenal-3-2016-2017.webp', orden: 3 },
                ],
            },
        },
    });
     const prodArsenal3 = await prisma.producto.create({
        data: {
            nombre: 'Camiseta Local Arsenal 23/24',
            descripcion: 'Camiseta oficial local temporada 23/24',
            precio: 115.50,
            stock: 8,
            equipoId: arsenal.id,
            imagenes: {
                create: [
                    { url: '/images/premier-league/arsenal/arsenal-4-2012-2013.webp', orden: 1 },
                    { url: '/images/premier-league/arsenal/arsenal-5-2012-2013.webp', orden: 2 },
                    { url: '/images/premier-league/arsenal/arsenal-6-2012-2013.webp', orden: 3 },
                ],
            },
        },
    });

    console.log('Seed completado ✅');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
