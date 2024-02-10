import express from "express";
import "dotenv/config";
import cors from "cors";
import db from "./database/db.js";
import cookieParser from "cookie-parser";

import ticketRouter from "./routes/api/ticketRoutes.js";
import userRouter from "./routes/api/userRoutes.js";
import roleRouter from "./routes/api/roleRoutes.js";

import corsOption from "./configs/corsOptions.js";
import logRouter from "./routes/api/logRoutes.js";

const port = 8000;

db();

const app = express();

app.use(express.json());
app.use(cors(corsOption));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/ticket", ticketRouter);
app.use("/api/user", userRouter);
app.use("/api/role", roleRouter);
app.use("/api/log", logRouter);

app.all("*", (req, res) => {
  return res.status(404).json({
    message: "Route Not Found",
  });
});

app.listen(port, () => {
  console.log(`now listen on port =>${port}..................`);
});
