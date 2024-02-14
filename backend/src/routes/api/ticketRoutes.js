import express from "express";

import {
  ticketDelete,
  ticketList,
  ticketStore,
  ticketUpdate,
  ticketAdjust,
} from "../../controllers/ticketController.js";
import authorize from "../../middlewares/permissionHandler.js";
import validateTokenHandler from "../../middlewares/validateTokenHandler.js";
import { storeTicketValidation } from "../../validation/ticketValidation.js";

const ticketRouter = express.Router();

ticketRouter.use(validateTokenHandler);

ticketRouter.get("/list", authorize("ticket-list"), ticketList);

ticketRouter.post(
  "/store",
  authorize("ticket-store"),
  storeTicketValidation,
  ticketStore
);

ticketRouter.put(
  "/update/:id",
  authorize("ticket-update"),
  storeTicketValidation,
  ticketUpdate
);

ticketRouter.delete("/delete/:id", authorize("ticket-delete"), ticketDelete);

ticketRouter.put("/adjust/:id", authorize("ticket-adjust"), ticketAdjust);

export default ticketRouter;
