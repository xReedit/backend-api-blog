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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var client_1 = require("@prisma/client");
var auth_1 = require("../middleware/auth");
var prisma = new client_1.PrismaClient();
var router = express.Router();
router.get('/', function (req, res) {
    res.status(200).json({ message: 'Estás conectado a changelog' });
});
router.get('/all', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var rpt;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.changelog.findMany({
                    select: {
                        id: true,
                        route: true,
                        descripcion: true,
                        fecha: true,
                        titulo: true
                    },
                    where: { estado: '0' }
                })];
            case 1:
                rpt = _a.sent();
                // formatear fecha
                rpt.forEach(function (element) {
                    element.fecha = element.fecha.toISOString().slice(0, 10);
                });
                res.status(200).send(rpt);
                prisma.$disconnect();
                return [2 /*return*/];
        }
    });
}); });
router.get('/byId/:route', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var route, rpt;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                route = req.params.route;
                return [4 /*yield*/, prisma.changelog.findMany({
                        where: { route: route }
                    })];
            case 1:
                rpt = _a.sent();
                res.status(200).send(rpt);
                prisma.$disconnect();
                return [2 /*return*/];
        }
    });
}); });
// obtener el ultimo registro ingresado
router.get('/last-version', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var rpt;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.changelog.findMany({
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
            ];
            case 1:
                rpt = _a.sent();
                // console.log('rpt[0]', rpt[0]);
                res.status(200).send(rpt[0]);
                prisma.$disconnect();
                return [2 /*return*/];
        }
    });
}); });
router.post('/create', auth_1.auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, titulo, descripcion, route, body, rpt;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, titulo = _a.titulo, descripcion = _a.descripcion, route = _a.route, body = _a.body;
                return [4 /*yield*/, prisma.changelog.create({
                        data: {
                            titulo: titulo,
                            descripcion: descripcion,
                            route: route,
                            body: body,
                            fecha: new Date()
                        }
                    })];
            case 1:
                rpt = _b.sent();
                res.status(200).send(rpt);
                prisma.$disconnect();
                return [2 /*return*/];
        }
    });
}); });
router.put('/update/:id', auth_1.auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, titulo, descripcion, route, body, rpt;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, titulo = _a.titulo, descripcion = _a.descripcion, route = _a.route, body = _a.body;
                return [4 /*yield*/, prisma.changelog.update({
                        where: { id: Number(id) },
                        data: {
                            titulo: titulo,
                            descripcion: descripcion,
                            route: route,
                            body: body
                        }
                    })];
            case 1:
                rpt = _b.sent();
                res.status(200).send(rpt);
                prisma.$disconnect();
                return [2 /*return*/];
        }
    });
}); });
exports.default = router;
