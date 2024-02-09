import mongoose from 'mongoose';
import Role from "./Role.js";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    role_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
});

// Pre middleware to set the roleID before saving the user
userSchema.pre('save', async function(next) {
    try {
        // Find the lowest level role
        const lowestLevelRole = await Role.findOne().sort('level').exec();

        if (!lowestLevelRole) {
            console.error('No roles found in the database');
            return next(new Error('No roles found'));
        }

        // Set the roleID to the ID of the lowest level role
        this.role_id = lowestLevelRole._id;
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('User', userSchema);

export default User;
