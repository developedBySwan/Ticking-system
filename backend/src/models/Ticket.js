import mongoose from "mongoose";
import Role from "./Role.js";
import { response } from "../helpers/helper.js";

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  is_finished: { type: Boolean, required: true, default: false },
  approved_step: { type: Number },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

// Pre middleware to set the roleID before saving the ticket
ticketSchema.pre("save", async function (next) {
  try {
    // Find the lowest level role
    const lowestLevelRole = await Role.findOne({
      level: 1,
    }).exec();

    if (!lowestLevelRole) {
      response(res, "Level Not Found", 422);
    }

    // Set the roleID to the ID of the lowest level role
    this.role_id = lowestLevelRole._id;
    next();
  } catch (error) {
    next(error);
  }
});

export default Ticket;
