const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    apiKey: {
        type: String,
        required: true,
    }
})

const User = mongoose.model('User', userSchema);
module.exports = mongoose.models.User || User;