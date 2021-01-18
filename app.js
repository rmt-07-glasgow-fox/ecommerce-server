import cors from 'cors';
import express from 'express';
import router from './routers/index.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(router);
//TODO: Error Handler in middlewares/errorHandlers.js

//TODO: Listen in bin/http.js
