// create crud orm prisma
import express from "express";
import cors from "cors";
// import * as bodyParser from 'body-parser';

import routes from "./routes";

const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

app.use('/api-blog', routes)

app.listen(30000);

