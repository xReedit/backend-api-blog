"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// create crud orm prisma
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
// import * as bodyParser from 'body-parser';
var routes_1 = __importDefault(require("./routes"));
var app = (0, express_1.default)();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api-blog', routes_1.default);
app.listen(30000);
