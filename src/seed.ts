import { PrismaClient, Rol } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
    //      const { hash } = bcrypt;
    //             const hashedPassword = await hash('admin123', 10)
    // const admin = await prisma.user.create({
    //     data:{
    //         name: 'admin',
    //         lastname:'admin',
    //         email: 'admin@gmail.com',
    //         password: hashedPassword,
    //         rol: Rol.ADMIN,
    //         direccion: 'Calle Admin 123'
    //     }
    // })

    const serieA = await prisma.liga.create({
        data: {
            name: 'Serie A',
            icon: 'https://mcdn.wallpapersafari.com/medium/10/22/q8ePzp.jpg',
        },
    });
    const juventus = await prisma.equipo.create({

        data: {
            name: 'Juventus',
            ligaId: serieA.id,
            icon: 'https://th.bing.com/th/id/OSB.vNQsLQlEyhg9trOcq1crow--.png?w=50&h=50&c=6&qlt=90&o=6&cb=ucfimg1&dpr=1.5&pid=BingSports&ucfimg=1',
        },
    });

    const inter = await prisma.equipo.create({

        data: {
            name: 'Inter Milán',
            ligaId: serieA.id,
            icon: 'https://th.bing.com/th/id/OSB.Ke_3loH0J8XQxL3gVTo1oQ--.png?w=50&h=50&c=6&qlt=90&o=6&cb=ucfimg1&dpr=1.5&pid=BingSports&ucfimg=1',

        },
    });

        const milan = await prisma.equipo.create({

        data: {
            name: 'AC Milán',
            ligaId: serieA.id,
            icon: 'https://th.bing.com/th?id=OSB.g2EJ%7cSS_b6vLjgrxQ_Kc5A--.png&w=50&h=50&c=6&qlt=90&o=6&cb=ucfimg1&dpr=1.5&pid=BingSports&ucfimg=1',

        },
    });

         const napoli = await prisma.equipo.create({

        data: {
            name: 'Napoli',
            ligaId: serieA.id,
            icon: 'https://th.bing.com/th/id/OSB.Hy9F6L5UzwcfI7gkuXitvw--.png?w=50&h=50&c=6&qlt=90&o=6&cb=ucfimg1&dpr=1.5&pid=BingSports&ucfimg=1',

        },
    });



    const bundesliga = await prisma.liga.create({
        data: {
            name: 'Bundesliga',
            icon: 'https://mcdn.wallpapersafari.com/medium/10/22/q8ePzp.jpg',
        },
    });

    const bayer = await prisma.equipo.create({

        data: {
            name: 'Bayer Munich',
            ligaId: bundesliga.id,
            icon: 'https://th.bing.com/th/id/OSB.F2KuCQqGSNe0wvHOLoBuxQ--.png?w=50&h=50&c=6&qlt=90&o=6&cb=ucfimg1&dpr=1.5&pid=BingSports&ucfimg=1',

        },
    });

    const borusion = await prisma.equipo.create({

        data: {
            name: 'Borussia Dortmund',
            ligaId: bundesliga.id,
            icon: 'https://th.bing.com/th/id/OSB.Sd_qXw1HLdgnGdkmI7EJ8A--.png?w=50&h=50&c=6&qlt=90&o=6&cb=ucfimg1&dpr=1.5&pid=BingSports&ucfimg=1',

        },
    });

     const le = await prisma.equipo.create({

        data: {
            name: 'Bayer Leverkusen',
            ligaId: bundesliga.id,
            icon: 'https://www.bing.com/th/id/OSB.cfhjS6m4E_KnM5K4p1HFOQ--.png?w=60&h=60&c=6&qlt=90&o=6&cb=ucfimg1&dpr=2&pid=BingSports&ucfimg=1',

        },
    });



    const ligue1 = await prisma.liga.create({
        data: {
            name: 'Ligue 1',
            icon: 'https://mcdn.wallpapersafari.com/medium/10/22/q8ePzp.jpg',
        },
    });

      const paris = await prisma.equipo.create({

        data: {
            name: 'Paris Saint-Germain FC',
            ligaId: ligue1.id,
            icon: 'https://th.bing.com/th/id/OSB.qGnsop_03w3ynMjJcdFDbg--.png?w=50&h=50&c=6&qlt=90&o=6&cb=ucfimg1&dpr=1.5&pid=BingSports&ucfimg=1',

        },
    });

     const olm = await prisma.equipo.create({

        data: {
            name: 'Olympique Lyon',
            ligaId: ligue1.id,
            icon: 'https://th.bing.com/th?id=OSB.oFYlFuU9efiy1%7cHxJ%7cLPMQ--.png&w=50&h=50&c=6&qlt=90&o=6&cb=ucfimg1&dpr=1.5&pid=BingSports&ucfimg=1',

        },
    });

    /*
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

    */
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
