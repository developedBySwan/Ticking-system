import express from "express";
import 'dotenv/config';
import db from "./database/db.js";
import ticketRouter from "./routes/api/ticket.js";
import userRouter from "./routes/api/userRoutes.js";

db();

const app = express();
app.use(express.json());

const port = 8000;

app.use('/api/ticket', ticketRouter);
app.use('/api/user', userRouter);

app.listen(port, () => {
    console.log(`now listen on port =>${port}..................`)
})