const mongoose = require("mongoose");

const { Schema, model } = mongoose;
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: Number,
    favorites: { type: Array, default: [] },
    // fav: [{}],
    profilePic: {
        //     data: Buffer,
        //     contentType: String,
        type: String,
    },
    isAdmin: { type: Boolean, required: true, default: false },
});

module.exports = User = model("user", userSchema);
