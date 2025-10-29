import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    /*
    const premier = await prisma.liga.create({
        data: {
            name: 'Premier League',
            icon: 'https://mcdn.wallpapersafari.com/medium/10/22/q8ePzp.jpg',
        },
    });
*/
    const liverpool = await prisma.equipo.update({
        where: { id: 1 },
        data: {

            icon: 'https://th.bing.com/th?id=OSB.PGJxes%7caBVYuf_nP8XCIlg--.png&w=60&h=60&c=6&qlt=90&o=6&dpr=2&pid=BingSports',

        },
    });

    const arsenal = await prisma.equipo.update({
        where: { id: 2 },
        data: {

            icon: 'https://www.bing.com/th/id/OSB.VXxjrqWZWwmw2Ju4T8AJJA--.png?w=60&h=60&c=6&qlt=90&o=6&dpr=2&pid=BingSports',

        },
    });

    const chelsea = await prisma.equipo.update({
        where: { id: 3 },
        data: {

            ligaId: 1,
        },
    });

    const manCity = await prisma.equipo.update({
        where: { id: 4 },
        data: {

            ligaId: 1,
        },
    });

    const manUnited = await prisma.equipo.update({
        where: { id: 5 },
        data: {

            ligaId: 1,
        },
    });

    const tot = await prisma.equipo.update({
        where: { id: 6 },
        data: {

            ligaId: 1,
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
