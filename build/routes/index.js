"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var usuario_1 = __importDefault(require("../controllers/usuario"));
var categoria_1 = __importDefault(require("../controllers/categoria"));
var publicacion_1 = __importDefault(require("../controllers/publicacion"));
var actions_blog_1 = __importDefault(require("../controllers/actions.blog"));
var changelog_1 = __importDefault(require("../controllers/changelog"));
var tag_1 = __importDefault(require("../controllers/tag"));
var auth_1 = require("../middleware/auth");
var usuario_2 = require("../controllers/usuario");
var router = express.Router();
router.get('/', function (req, res) {
    res.status(200).json({ message: 'Estás conectado a nuestra API port: 30000' });
});
router.use('/login', usuario_2.loginOne);
router.use('/verify-login', auth_1.authVerify);
router.use('/usuario', auth_1.auth, usuario_1.default);
router.use('/categoria', auth_1.auth, categoria_1.default);
router.use('/tag', auth_1.auth, tag_1.default);
router.use('/publicacion', auth_1.auth, publicacion_1.default);
router.use('/blog', actions_blog_1.default);
router.use('/changelog', changelog_1.default);
// router.use('/changelog-edit', auth, changelog);
exports.default = router;
