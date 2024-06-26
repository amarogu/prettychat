import bcrypt from "bcrypt";
import mongoose from "mongoose";
if (mongoose.models.User) {
    mongoose.deleteModel('User');
}

export interface IUser {
    _id: string;
    __v: number;
    apiKey: string;
    name: string;
    password: string;
}

const saltRounds = 10;

const userSchema = new mongoose.Schema({
    apiKey: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 64
    }
})

userSchema.pre('save', function(this: any, next: any) {
    if (this.isNew || this.isModified('password')) {
        const document = this;
        bcrypt.hash(document.password, saltRounds, function(err, hashedPassword) {
            if (err) {
                next(err);
            } else {
                document.password = hashedPassword;
                next();
            }
        });
    } else {
        next();
    }
});

export const User = mongoose.model('User', userSchema);