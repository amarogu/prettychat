const mongoose = require('mongoose');
if (mongoose.models.User) {
    mongoose.deleteModel('User');
}

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
})

const User = mongoose.model('User', userSchema);
module.exports = User;