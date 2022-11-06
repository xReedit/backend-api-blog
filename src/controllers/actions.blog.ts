import * as express from "express";
import { PrismaClient } from "@prisma/client";
import { transformDocument } from "@prisma/client/runtime";

const prisma = new PrismaClient();
const router = express.Router();


router.get('/posts-preview', async (req, res) => {
    const rpt = await prisma.publicacion.findMany({
        select: {
            idpublicacion: true,
            fecha: true,
            titulo: true,
            resumen: true,
            link_foto_principal: true,
            link_id: true,
            categoria: true,
            vistas: true,
            tags: true
        },
        // include: { usuario: false, categoria: true },
        where: { estado: '0' }
    });

    // rpt.map(x => {delete x.usuario['pass']; return x});
    res.status(200).send(rpt);
    prisma.$disconnect();
})

router.get('/byLink/:link_id', async (req, res) => {
    const { link_id } = req.params 
    const rpt = await prisma.publicacion.findMany({
        select: {
            content: true                      
        },
        // include: { usuario: false, categoria: true },
        where: { link_id: link_id }
    });

    // rpt.map(x => {delete x.usuario['pass']; return x});
    res.status(200).send(rpt);
    prisma.$disconnect();
})

router.get('/byLinkAll/:link_id', async (req, res) => {
    const { link_id } = req.params 
    const rpt = await prisma.publicacion.findMany({
        select: {
            idpublicacion: true,
            fecha: true,
            titulo: true,
            resumen: true,
            link_foto_principal: true,
            link_id: true,
            categoria: true,
            vistas: true,
            tags: true,
            content: true
        },
        // include: { usuario: false, categoria: true },
        where: { link_id: link_id }
    });

    // rpt.map(x => {delete x.usuario['pass']; return x});
    res.status(200).send(rpt);
    prisma.$disconnect();
})


router.put('/add-vista/:id', async(req, res) => {
    const { id } = req.params

    const rpt = await prisma.publicacion.updateMany({
        where: { idpublicacion: Number(id)},
        data: {
            vistas: { increment: 1 }
        }
    })

    res.status(200).send(rpt);
    prisma.$disconnect();
})

// post by tags relacicionados
router.get('/byVistas', async (req, res) => {    
    const rpt = await prisma.publicacion.findMany({
        select: {
            idpublicacion: true,
            fecha: true,
            titulo: true,
            resumen: true,
            link_foto_principal: true,
            link_id: true,
            categoria: true,
            vistas: true,
            tags: true
        },
        where: { estado: '0' },
        take: 3,
        orderBy: [{
            vistas: 'desc'            
          }]
    });

    res.status(200).send(rpt)
    prisma.$disconnect()
})

export default router;