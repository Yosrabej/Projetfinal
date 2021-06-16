const express = require("express");

const {
    Register,
    Login,
    Update,
    Delete,
    Get,
    GetAll,
} = require("../controlles/user.controllers");

const {
    validation,
    registerValidate,
    loginValidate,
} = require("../middlewares/validateUser");
const isAuth = require("../middlewares/isAuth");
const User = require("../models/User");
const router = express.Router();

router.get("/test", (req, res) => {
    res.send("testing router");
});

//@method: POST
//parameter: req.body
//path: http:localhost:5000/api/user/register
//Public
router.post("/register", registerValidate(), validation, Register);

//@method: POST
//parameter: req.body
//path: http:localhost:5000/api/user/login
//Public
router.post("/login", loginValidate(), validation, Login);

/*
@method: GET
@ path:http:localhost:5000/api/user/current
@ parameter: req.headers  
public
*/
router.get("/current", isAuth, (req, res) => {
    res.send({ msg: "authorized", user: req.user });
});

//get all users
router.get("/users", GetAll);
//get a user
router.get("/:_id", Get);
//update
router.put("/:id", Update);
//delete
router.delete("/:id", Delete);

//add to favorites
router.put("/favorites/:id", async (req, res) => {
    try {
        const id = req.params.id;
        console.log(req.body);

        const user1 = await User.findById(id);

        const favorite = user1.favorites;

        const isExist = favorite.filter((el) => el._id == req.body.post._id);
        console.log("exist", isExist);
        if (isExist.length > 0) {
            return res.status(401).send("Already Favourite");
        }
        var user = await User.findOneAndUpdate(
            { _id: req.params.id },
            {
                $push: { favorites: req.body.post },
            }
        );
        res.status(200).send({
            msg: "has been added to favorites",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ errors: [{ msg: "error", error }] });
    }
});

module.exports = router;
