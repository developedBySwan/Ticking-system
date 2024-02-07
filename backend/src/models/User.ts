// models/User.ts
import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserDocument extends Document {
    username: string;
    email: string;
    phone: string;
    password: string;
    user_role: string;
}

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    user_role: { type: String, required: true },
});

userSchema.pre<UserDocument>('save', async function(next) {
    const user = this;

    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        next();
    } catch (error) {
        if (typeof error === "string") {
        return error.toUpperCase()
    } else if (error instanceof Error) {
        return error.message
    }
    }
});

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
