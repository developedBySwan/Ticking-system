import asyncHandler from "express-async-handler";
import Ticket from "../models/Ticket.js";
import { response } from "../helpers/helper.js";

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
    
    const tickets = await Ticket
        .find()
        .skip((page - 1) * limit)
        .limit(limit);
    
    const ticketsCount = await Ticket.countDocuments();

    const transformedTickets = tickets.map(ticket => {
        return {
            _id: ticket._id,
            title: ticket.title,
            is_finished: ticket.is_finished,
        }
    })

    return res
        .status(200)
        .json({
            data: transformedTickets,
            currentPage: page,
            perPage: limit,
            total: ticketsCount,
        });
})

/**
 * @des ticket store
 * 
 * @route POST api/ticket/store
 * 
 * @access private
 */
const ticketStore = asyncHandler(async (req, res) => {
    await Ticket.create(req.body);

    return response(res, "Ticket Store Successfully", 200);
})

/**
 * @des ticket update
 * 
 * @route PUT api/ticket/update/:id
 * 
 * @access private
 */
const ticketUpdate = asyncHandler(async (req, res) => {
    await Ticket.findByIdAndUpdate(
                        req.params.id,
                        req.body
                    );

    return response(res, "Ticket Update Successfully", 200);
})

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

    return res.status(200).json({ "message": "Ticket Deleted Successfully" });
})

export {
    ticketList,
    ticketStore,
    ticketUpdate,
    ticketDelete,
}