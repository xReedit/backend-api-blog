import * as express from "express";
import { PrismaClient } from "@prisma/client";

import { auth } from '../middleware/auth';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', function (req, res) {
    res.status(200).json({ message: 'Estás conectado a changelog' })
});

router.get('/all', async (req, res) => {
    const rpt = await prisma.changelog.findMany({
        select: {
            id: true,
            route: true,
            descripcion: true,
            fecha: true,
            titulo: true
        },
        where: { estado: '0' }
    });

    // formatear fecha
    rpt.forEach((element: any) => {
        element.fecha = element.fecha.toISOString().slice(0, 10);
    });

    res.status(200).send(rpt);
    prisma.$disconnect();
})

router.get('/byId/:route', async(req, res) => {
    const { route } = req.params    
    const rpt = await prisma.changelog.findMany({
        where: {route: route}
    })

    res.status(200).send(rpt);
    prisma.$disconnect();
})


// obtener el ultimo registro ingresado
router.get('/last-version', async(req, res) => {    
    const rpt = await prisma.changelog.findMany({
        take: 1,
        select: {
            id: true,
            descripcion: true,
            titulo: true,
            route: true,
        },
        where: { estado: '0' },
        orderBy: {
            id: 'desc'
        }
    })

    // console.log('rpt[0]', rpt[0]);
    res.status(200).send(rpt[0]);
    prisma.$disconnect();
})



router.post('/create', auth, async (req, res) => {
    const { titulo, descripcion, route, body } = req.body    
    const rpt = await prisma.changelog.create({
        data: {
            titulo,
            descripcion,
            route,
            body,
            fecha: new Date()
        }
    })
    
    res.status(200).send(rpt);
    prisma.$disconnect();
})

router.put('/update/:id', auth, async(req, res) => {
    const { id } = req.params
    const { titulo, descripcion, route, body } = req.body
    const rpt = await prisma.changelog.update({
        where: { id: Number(id)},
        data: {
            titulo,
            descripcion,
            route,
            body
        }
    })

    res.status(200).send(rpt);
    prisma.$disconnect();
})

export default router;