import express from "express";
import { logList } from "../../controllers/logController.js";
import validateTokenHandler from "../../middlewares/validateTokenHandler.js";

const logRouter = express.Router();

logRouter.use(validateTokenHandler);

logRouter.get("/list", logList);

export default logRouter;
