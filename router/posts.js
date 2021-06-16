const express = require("express");
const { validation, addpostValidate } = require("../middlewares/validatePost");
const router = express.Router();
const Post = require("../models/Post");
const isAuth = require("../middlewares/isAuth");
const Comment = require("../models/Comment");
const Rating = require("../models/Rating");
// const ObjectID = require("mongoose").Types.ObjectId;
//test
router.get("/", (req, res) => {
    res.send("post routes test");
});

//create a post
router.post("/addpost", addpostValidate(), validation, async (req, res) => {
    try {
        // const {
        //     desc,
        //     img,
        //     title,
        //     name,
        //     ingredients,
        //     comments: [],
        // } = req.body;
        const newPost = new Post({
            ...req.body,
        });
        await newPost.save();
        res.status(200).send({ msg: "post created", post: newPost });
    } catch (error) {
        console.log(error);
        res.status(500).send({ errors: [{ msg: "error" }] });
    }
});
//get all posts
router.get("/all", async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).send({ msg: "posts", posts });
    } catch (error) {
        res.status(500).send({ errors: [{ msg: "error" }] });
    }
});
//get a post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate("comments");
        res.status(200).send({ msg: "post", post });
    } catch (error) {
        res.status(500).send({ errors: [{ msg: "error" }] });
    }
});
//update a post
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).send({ msg: "the post is updated", post });
        } else {
            res.status(500).send({
                errors: [{ msg: "you can update only your post" }],
            });
        }
    } catch (error) {
        res.status(500).send({ errors: [{ msg: "error" }] });
    }
});
//delete a post
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).send({ msg: " post deleted" });
        } else {
            res.status(400).send({
                errors: [{ msg: "you can delete only your post" }],
            });
        }
    } catch (error) {
        res.status(500).send({ errors: [{ msg: "error" }] });
    }
});
//like a post
// router.put("/:id/like", async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id);

//         const newPost = await Post.findByIdAndUpdate(post, {
//             likes: post.likes + 1,
//         });

//         res.status(200).send({ msg: "liked", newPost });
//     } catch (error) {
//         res.status(500).send({ errors: [{ msg: "error" }] });
//     }
// });

// add comment
router.post("/comment/:id", isAuth, async (req, res) => {
    try {
        const { text } = req.body;
        const userId = req.user._id;
        const postId = req.params.id;
        const newComment = await new Comment({ text, userId, postId });
        await newComment.save();
        // console.log(newComment._id);
        const post = await Post.findOne({
            _id: postId,
        });
        await post.comments.push(newComment._id);
        await post.save();
        res.status(200).send({
            msg: "the comment is added",
            newComment,
            post,
            user: req.user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ errors: [{ msg: "error" }] });
    }
});
//delete comment// _id undefined
// router.put("/comment-delete/:id", async (req, res) => {
//     // if (!ObjectID.isValid(req.params.id))
//     //     return res.status(400).send("ID unknown : " + req.params.id);

//     try {
//         // const userId = req.user._id;
//         // const commentId = req.params.comment._id;
//         // console.log("id", commentId);
//         const postId = req.params.id;
//         const post = await Post.findOne({
//             _id: postId,
//         });
//         // const isExist = post1.comments.filter(
//         //     (comment) => comment.id === commentId
//         // );
//         // if (isExist.length > 0) {
//         //     return res.status(401).send("exists");
//         // }
//         await post.updateOne({
//             $pull: { comments: { _id: req.params.id } },
//         });
//         await Comment.findByIdAndDelete(req.params.commentId);
//         res.status(200).send({ msg: " comment deleted", post });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({ errors: [{ msg: "error" }] });
//     }
// });
router.delete("/comments/:postId/:commentId", async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.postId,
            {
                $pull: { comments: req.params.commentId },
            },
            { new: true }
        );

        if (!post) {
            return res.status(400).send("Post not found");
        }

        await Comment.findByIdAndDelete(req.params.commentId);

        res.status(200).send({ msg: " comment deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ errors: [{ msg: "error" }] });
    }
});

//todo: get all posts of a user
router.get("/profile/:id", async (req, res) => {
    try {
        const user = await User.findOne({ _id: userId });
        const posts = await Post.find({ _id: { $in: userIds } });
        res.status(200).send({ msg: "posts", posts });
    } catch (error) {
        console.log(error);
        res.status(500).send({ errors: [{ msg: "error" }] });
    }
});
//get comment
router.get("/getcomment/:id", async (req, res) => {
    try {
        const comment = await Comment.findOne({ _id: req.params.id }).populate(
            "userId postId"
        );
        res.status(200).send({ comment });
    } catch (error) {
        console.log(error);
    }
});
//get comments
router.get("/getcomments/:id", async (req, res) => {
    try {
        const comment = await Comment.find({ _id: req.params.id }).populate(
            "userId postId"
        );
        res.status(200).send({ comments });
    } catch (error) {
        console.log(error);
    }
});
// rating
router.post("/rating-add/:id", async (req, res) => {
    try {
        const { rating } = req.body;
        // const user = req.user._id; //_id undefined
        // console.log("user", user);
        const postId = req.params.id;

        const post = await Post.findById(postId);
        const newRating = await new Rating({ rating, postId });
        await newRating.save();
        post.ratings.push(newRating);
        // var post = await Post.findOneAndUpdate(
        //     { _id: req.params.id },
        //     {
        //         $push: { ratings: req.body.post },
        //     }
        // );
        await post.save();

        res.status(200).send({
            msg: "rating is added",
            newRating,
            post,
            user: req.user,
        });
    } catch (error) {
        console.log("error", error);
        res.status(500).send({ errors: [{ msg: "error" }] });
    }
});

//get rating
router.get("/getrating/:id", async (req, res) => {
    try {
        const rating = await Rating.findOne({ _id: req.params.id }).populate(
            "userId postId"
        );
        res.status(200).send({ rating });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
