"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// create crud orm prisma
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var process_1 = require("process");
// import * as bodyParser from 'body-parser';
var routes_1 = __importDefault(require("./routes"));
var app = (0, express_1.default)();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
var portConect = process_1.env.PORT || 30000;
app.use('/api-blog', routes_1.default);
// app.listen(30000);
app.listen(portConect, function () {
    return console.log('REST API server ready at: http://localhost:30000');
});
