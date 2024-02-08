import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false, },
    is_processing: { type: Boolean, required: true, default: false },
    approved_step: { type: String, required: true, default: staff }
})

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;