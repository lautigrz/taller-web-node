import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    
    const liga = await prisma.liga.create({
        data: {
            name: 'La Liga',
            icon: 'https://mcdn.wallpapersafari.com/medium/10/22/q8ePzp.jpg',
        },
    });

    const barcelona = await prisma.equipo.create({
   
        data: {
            name: 'FC Barcelona',
            ligaId: liga.id,
            icon: 'https://www.bing.com/th/id/OSB.HUhNQYtTYvLwMeBbN6jtpQ--.png?w=60&h=60&c=6&qlt=90&o=6&dpr=2&pid=BingSports',

        },
    });

       const madird = await prisma.equipo.create({
   
        data: {
            name: 'Real Madrid',
            ligaId: liga.id,
            icon: 'https://www.bing.com/th/id/OSB.iACK1IFXXDNVcL9vAy568w--.png?w=60&h=60&c=6&qlt=90&o=6&dpr=2&pid=BingSports',

        },
    });

    const atl = await prisma.equipo.create({
   
        data: {
            name: 'Atletico de Madrid',
            ligaId: liga.id,
            icon: 'https://th.bing.com/th/id/OSB.6FU4bH2DWUoELzbC4UrYgw--.png?w=60&h=60&c=6&qlt=90&o=6&dpr=2&pid=BingSports',

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
