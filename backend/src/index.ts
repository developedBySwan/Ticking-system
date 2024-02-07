import express, { Express } from "express";
import dotenv from 'dotenv';
import ticketRouter from "./routes/api/ticket.js";

dotenv.config();

const app: Express = express();

const port: number = 8000;

app.use('/ticket', ticketRouter);

app.listen(port, () => {
    console.log(`now listen on port =>${port}..................`)
})