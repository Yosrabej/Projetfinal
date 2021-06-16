const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema({
    userId: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    title: { type: String },

    desc: {
        type: String,
        max: 500,
    },
    ingredients: { type: String },
    img: {
        // data: Buffer,
        // contentType: String,
        type: String,
    },
    name: { type: String },
    // likes: {
    //     type: Number,
    //     default: 0,
    // },
    Recipes: { type: Array, default: [] },

    comments: [{ type: Schema.Types.ObjectId, ref: "comment" }],
    ratings: [{ type: Schema.Types.ObjectId, ref: "rating" }],
    // post: [{ type: Schema.Types.ObjectId, ref: "post" }],
});

module.exports = Post = model("post", postSchema);
