import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    user_role: { type: String, required: true, default: "staff" },
});

const User = mongoose.model('User', userSchema);

export default User;
