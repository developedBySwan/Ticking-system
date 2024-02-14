import { check } from "express-validator";
import { validationErrorThrow } from "../helpers/helper.js";
import Ticket from "../models/Ticket.js";

const storeTicketValidation = [
  check("title").notEmpty().withMessage("Title Field is required!"),
  check("description").isString().withMessage("Description must be string"),
  async (req, res, next) => {
    if (req.method === "PUT") {
      const ticketId = req.params.id;

      const ticket = await Ticket.findById(ticketId).exec();

      if (!ticket) {
        return response(res, "Ticket not found", 404);
      }
    }
    return next();
  },
  validationErrorThrow(),
];

export { storeTicketValidation };
