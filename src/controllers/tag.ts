import * as express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', function (req, res) {
    res.status(200).json({ message: 'Estás conectado a tag' })
});


// create
router.post('/create', async (req, res) => {
    const { descripcion } = req.body    
    const rpt = await prisma.tag.create({
        data: {
            descripcion
        }
    })
    
    // res.json(rpt)    
    res.status(200).send(rpt);
    prisma.$disconnect();
});

//update
router.put('/update/:id', async(req, res) => {
    const { id } = req.params
    const { descripcion } = req.body
    const rpt = await prisma.tag.update({
        where: { id: Number(id)},
        data: {
            descripcion
        }
    })

    res.status(200).send(rpt);  
    prisma.$disconnect();
})

// delete logic
router.put('/delete/:id', async(req, res) => {
    const { id } = req.params
    const rpt = await prisma.tag.update({
        where: { id: Number(id)},
        data: {
            estado: '1'
        }
    })

    res.status(200).send(rpt);
    prisma.$disconnect();
})

router.get('/all', async (req, res) => {
    const rpt = await prisma.tag.findMany({
        where: { estado: '0' }
    });
    res.status(200).send(rpt);
    prisma.$disconnect();
})

//get user by id
router.get('/byId/:id', async(req, res) => {
    const { id } = req.params    
    const rpt = await prisma.tag.findMany({
        where: {id: Number(id)}
    })

    res.status(200).send(rpt);
    prisma.$disconnect();
})



export default router;