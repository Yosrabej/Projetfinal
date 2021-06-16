const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ratingSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    rating: { type: Number },
    postId: { type: Schema.Types.ObjectId, ref: "post", required: true },
});

module.exports = Rating = model("rating", ratingSchema);
