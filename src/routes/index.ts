import * as express from "express";
import usuario from "../controllers/usuario";
import categoria from "../controllers/categoria";
import publicacion from "../controllers/publicacion";
import actionsBlog from "../controllers/actions.blog";
import changelog from "../controllers/changelog";
import tag from "../controllers/tag";
import { auth, authVerify } from '../middleware/auth';
import { loginOne } from "../controllers/usuario";


const router = express.Router();

router.get('/', function (req, res) {
    res.status(200).json({ message: 'Estás conectado a nuestra API port: 30000' })
});

router.use('/login', loginOne);
router.use('/verify-login', authVerify);
router.use('/usuario', auth, usuario);
router.use('/categoria', auth, categoria);
router.use('/tag', auth, tag);
router.use('/publicacion', auth, publicacion);
router.use('/blog', actionsBlog);
router.use('/changelog', changelog);
// router.use('/changelog-edit', auth, changelog);

export default router;