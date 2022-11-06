import * as express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', function (req, res) {
    res.status(200).json({ message: 'Estás conectado a publicaciones' })
});

// create
router.post('/create', async (req, res) => {
    const _data = {...req.body, fecha: new Date(), idusuario: req['token'].id}        
    const rpt = await prisma.publicacion.createMany({
        data: _data
    })
    
    res.status(200).send(rpt);
    prisma.$disconnect();
});

//update
router.put('/update/:id', async(req, res) => {
    const { id } = req.params
    const _data = {...req.body}
    const rpt = await prisma.publicacion.updateMany({
        where: { idpublicacion: Number(id)},
        data: _data
    })

    res.status(200).send(rpt);
    prisma.$disconnect();
})

// delete logic
router.put('/delete/:id', async(req, res) => {
    const { id } = req.params
    const rpt = await prisma.publicacion.update({
        where: { idpublicacion: Number(id)},
        data: {
            estado: '1'
        }
    })

    res.status(200).send(rpt); 
    prisma.$disconnect();
})


router.get('/all', async (req, res) => {
    const rpt = await prisma.publicacion.findMany({
        include: { usuario: true, categoria: true },
        where: { estado: '0' }
    });

    rpt.map(x => {delete x.usuario['pass']; return x});
    res.status(200).send(rpt);
    prisma.$disconnect();
})


//get user by id
router.get('/byId/:id', async(req, res) => {
    const { id } = req.params    
    const rpt = await prisma.publicacion.findMany({
        where: {idpublicacion: Number(id)},
        include: { usuario: true, categoria: true }
    })

    rpt.map(x => {delete x.usuario['pass']; return x});
    res.status(200).send(rpt);
    prisma.$disconnect();
})






export default router;