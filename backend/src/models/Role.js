import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String },
    level : { type: Number, unique: true } 
});

const Role = mongoose.model('Role', RoleSchema);

export default Role;