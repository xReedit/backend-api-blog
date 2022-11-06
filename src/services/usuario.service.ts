import * as jwt from 'jsonwebtoken';
import * as express from "express";
import * as bcrypt from 'bcryptjs';
import { SECRET_KEY } from '../middleware/auth';
import { PrismaClient } from "@prisma/client";


// const _SECRET_KEY = SECRET_KEY;
const prisma = new PrismaClient();
const router = express.Router();

export async function login(_usuario: any) {
    try {
        const usuario = await prisma.usuario.findFirst({ where: { nick: _usuario.nick } });

        if ( !usuario ) {
            throw new Error("Usuario o Clave incorrectos");
        }
    
        const isMatch = bcrypt.compareSync(_usuario.pass, usuario.pass);
    
        if (isMatch) {
            const token = jwt.sign({ id: usuario.idusuario, nick: usuario.nick }, SECRET_KEY ,
            {
                expiresIn: "1d",
            })

            return { usuario: usuario, token: token };
        } else {
            throw new Error("Usuario o Clave incorrectos");
        }        
    } 
    catch (err) {
        throw err;
    }
    
}
