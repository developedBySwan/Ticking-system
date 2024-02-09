import { response } from "../../helpers/helper.js";
import Ticket from "../../models/Ticket.js";

export default async function roleStoreValidation(req, res, next) {
    const { title, description } = req.body;
    
    if (!title) {
        return response(res,"Title filed is required",400);
    }

    if (req.method === "PUT") {
        const ticketId = req.params.id;

        const ticket = await Ticket.findById(ticketId).exec();

        if (!ticket) {
            return response(res, "Ticket not found", 404);
        }
    }

    return next();
}