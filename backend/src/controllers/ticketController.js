import asyncHandler from "express-async-handler";
import Ticket from "../models/Ticket.js";
import { response, storeActivityLog } from "../helpers/helper.js";
import Role from "../models/Role.js";
import mongoose from "mongoose";
import db from "../database/db.js";

/**
 * @des Ticket list
 *
 * @route GET api/ticket/list
 *
 * @access private
 */
const ticketList = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const { title } = req.query;

  const filter = {};

  if (title) {
    filter.title = { $regex: title, $options: "i" };
  }

  const tickets = await Ticket.find(filter)
    // .where({
    //   approved_step: req.user.role.level - 1,
    // })
    .skip((page - 1) * limit)
    .limit(limit);

  const ticketsCount = await Ticket.countDocuments();

  const transformedTickets = tickets.map((ticket) => {
    return {
      _id: ticket._id,
      title: ticket.title,
      is_finished: ticket.is_finished,
    };
  });

  return res.status(200).json({
    data: transformedTickets,
    currentPage: page,
    perPage: limit,
    total: ticketsCount,
  });
});

/**
 * @des ticket store
 *
 * @route POST api/ticket/store
 *
 * @access private
 */
const ticketStore = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await Ticket.create(req.body);

    await storeActivityLog(req, res, "Ticket", req.body);

    await session.commitTransaction();
    session.endSession();

    return response(res, "Ticket Store Successfully", 200);
  } catch (error) {
    // Abort the transaction and handle the error
    await session.abortTransaction();
    session.endSession();

    // Log the error for debugging
    console.error("Error storing ticket:", error);

    // Send an appropriate error response
    return response(res, "Failed to store ticket", 500);
  }
});

/**
 * @des ticket update
 *
 * @route PUT api/ticket/update/:id
 *
 * @access private
 */
const ticketUpdate = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const oldTicketData = await Ticket.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: false,
      }
    );

    console.log("Old Ticket Data => " + oldTicketData);

    await storeActivityLog(req, res, "Ticket", req.body, oldTicketData);

    await session.commitTransaction();
    session.endSession();

    return response(res, "Ticket Store Successfully", 200);
  } catch (error) {
    // Abort the transaction and handle the error
    await session.abortTransaction();
    session.endSession();

    // Log the error for debugging
    console.error("Error storing ticket:", error);

    // Send an appropriate error response
    return response(res, "Failed to store ticket", 500);
  }
});

/**
 * @des ticket update
 *
 * @route DELETE api/ticket/delete/:id
 *
 * @access private
 */
const ticketDelete = asyncHandler(async (req, res) => {
  const ticketId = req.params.id;

  const ticket = await Ticket.findById(ticketId).exec();

  if (!ticket) {
    return response(res, "Ticket not found", 404);
  }

  await Ticket.findByIdAndDelete(req.params.id);

  await storeActivityLog(req, res, "Ticket");

  return res.status(200).json({ message: "Ticket Deleted Successfully" });
});

const ticketAdjust = asyncHandler(async (req, res) => {
  const ticketId = req.params.id;

  const ticket = await Ticket.findById(ticketId)
    .where({
      approved_step: req.user.role.level - 1,
    })
    .exec();

  if (!ticket) {
    return response(res, "Ticket not found", 404);
  }

  const { is_approve, reject_reason } = req.body;

  if (is_approve) {
    Ticket.findByIdAndUpdate(ticketId, {
      approved_step: req.user.role.level,
      is_finished:
        req.user.role.level === (await Role.findOne().sort({ level: -1 }).level)
          ? true
          : false,
    });
    await storeActivityLog(req, res, "Ticket");

    return response(res, "Adjust Successfully", 200);
  } else {
    Ticket.findByIdAndUpdate(ticketId, {
      deny_reason: reject_reason,
      approved_step: 0,
      is_finished: false,
    });
  }
});

export { ticketList, ticketStore, ticketUpdate, ticketDelete, ticketAdjust };
