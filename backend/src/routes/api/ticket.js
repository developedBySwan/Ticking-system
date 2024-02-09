import express from 'express';

import { ticketDelete, ticketList, ticketStore, ticketUpdate } from '../../controllers/ticketController.js';
import ticketStoreValidation from "../../middlewares/Ticket/ticketStoreValidation.js";

const ticketRouter = express.Router();

ticketRouter
    .get(
        '/list',
        ticketList
    )
    
ticketRouter
    .post(
        '/store',
        ticketStoreValidation,
        ticketStore
    )

ticketRouter
    .put(
        '/update/:id',
        ticketStoreValidation,
        ticketUpdate,
)
    
ticketRouter
    .delete(
        '/delete/:id',
        ticketDelete,
    )

export default ticketRouter;