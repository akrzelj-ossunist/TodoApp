// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true }
});

userSchema.statics.findByEmail = async function (email) {
    return await this.findOne({ email });
};

// Connect to the 'users' collection
const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
