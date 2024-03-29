import bcrypt from "bcrypt";
import mongoose from "mongoose";
if (mongoose.models.User) {
    mongoose.deleteModel('User');
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

const User = mongoose.model('User', userSchema);
export default User;