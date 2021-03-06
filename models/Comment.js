const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const commentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    text: { type: String, required: true },
    username: { type: Schema.Types.ObjectId, ref: "user" },
    postId: { type: Schema.Types.ObjectId, ref: "post", required: true },
});

module.exports = Comment = model("comment", commentSchema);
