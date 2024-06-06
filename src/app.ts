// create crud orm prisma
import express from "express";
import cors from "cors";
import { env } from 'process';
// import * as bodyParser from 'body-parser';

import routes from "./routes";

const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

const portConect = env.PORT || 30000;

app.use('/api-blog', routes)

// app.listen(30000);


app.listen(portConect, () =>
    console.log('REST API server ready at: http://localhost:30000'),
)
