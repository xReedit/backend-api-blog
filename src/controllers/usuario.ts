import { Request, Response } from 'express';
import * as express from "express";
import * as bcrypt from 'bcryptjs';
import * as userServices from '../services/usuario.service';
import { getErrorMessage } from '../utils/errors.util';


import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();


// login user
export const loginOne = async (req: Request, res: Response) => {
// router.post('/login', async (req: Request, res: Response) => {
    try {
      const foundUser = await userServices.login(req.body);
      delete foundUser.usuario['pass'];
      res.status(200).send(foundUser);
    } catch (error) {
      return res.status(500).send(getErrorMessage(error));
    }
}
// );


// create
router.post('/create', async (req, res) => {
    const { nombre, nick, pass } = req.body    

    const hashPassword = await encrypPass(pass);

    const rpt = await prisma.usuario.create({
        data: {
            nombre,
            nick,
            pass: hashPassword
        }
    })
    
    // res.json(rpt)    
    res.status(200).send(rpt);
    prisma.$disconnect();
});



async function encrypPass(pass: string) {
    return await bcrypt.hash(pass, 10);
}

//update
router.put('/update/:id', async(req, res) => {
    const { id } = req.params
    const { nombre, nick, pass } = req.body
    const hashPassword = await encrypPass(pass);
    const rpt = await prisma.usuario.update({
        where: { idusuario: Number(id)},
        data: {
            nombre,
            nick,
            pass: hashPassword
        }
    })

    res.status(200).send(rpt);
    prisma.$disconnect();
})

// delete logic
router.put('/delete/:id', async(req, res) => {
    const { id } = req.params
    const rpt = await prisma.usuario.update({
        where: { idusuario: Number(id)},
        data: {
            estado: '1'
        }
    })

    res.status(200).send(rpt);
    prisma.$disconnect();
})

router.get('/all', async (req, res) => {
    const rpt = await prisma.usuario.findMany({
        where: { estado: '0' }
    });

    rpt.map(x => {delete x['pass']; return x});
    res.status(200).send(rpt);
    prisma.$disconnect();
})

//get user by id
router.get('/byId/:id', async(req, res) => {
    const { id } = req.params    
    const rpt = await prisma.usuario.findMany({        
        where: {
            idusuario: Number(id),            
        }        
    })
    
    rpt.map(x => {delete x['pass']; return x});
    res.status(200).send(rpt);
    prisma.$disconnect();
})






export default router;