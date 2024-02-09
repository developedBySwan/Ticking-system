import asyncHandler from "express-async-handler";
import Ticket from "../models/Ticket.js";
import { response } from "../helpers/helper.js";
import Role from "../models/Role.js";

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
        filter.title = { $regex: title, $options: 'i' }
    }
    
    const tickets = await Ticket
        .find(filter)
        .where({
            'approved_step' : req.user.role.level - 1,
        })
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

const ticketAdjust = asyncHandler(async (req, res) => {
    const ticketId = req.params.id;

    const ticket = await Ticket.findById(ticketId)
                // .where({
                //     'approved_step' : req.user.role.level - 1,
                // })
                .exec();

    if (!ticket) {
        return response(res, "Ticket not found", 404);
    }
    
    const { is_approve } = req.body;

    if (is_approve) {
        Ticket.findByIdAndUpdate(
            ticketId,
            {
                'approved_step': req.user.role.level,
                'is_finished' : req.user.role.level === await Role.findOne().sort({ level: -1 }).level ? true : false,
            }
        )
        response(res, "Adjust Successfully", 200);

    } else {
        response(res, "Is Approve Field is required", 422);
    }
});

export {
    ticketList,
    ticketStore,
    ticketUpdate,
    ticketDelete,
    ticketAdjust
}