const User = require("../models/User");

const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

//register
exports.Register = async (req, res) => {
    try {
        const { email } = req.body;
        const findUser = await User.findOne({ email });
        if (findUser) {
            return res
                .status(400)
                .send({ errors: [{ msg: "email should be unique" }] });
        }
        const newUser = new User({ ...req.body });
        //password hashed
        const { password } = req.body;
        const hashedpassword = await bcrypt.hash(password, saltRounds);
        newUser.password = hashedpassword;

        await newUser.save();
        //token
        const token = jwt.sign(
            {
                id: newUser._id,
            },
            process.env.SECRET_KEY,
            { expiresIn: "6h" }
        );

        res.status(200).send({ msg: "user is saved", user: newUser, token });
    } catch (error) {
        console.log(error);
        res.status(500).send({ errors: [{ msg: "user not saved" }] });
    }
};

//login
exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const findUser = await User.findOne({ email });

        if (!findUser) {
            return res
                .status(400)
                .send({ errors: [{ msg: "bad credential" }] });
        }
        const comparePass = await bcrypt.compare(password, findUser.password);

        if (!comparePass) {
            return res
                .status(400)
                .send({ errors: [{ msg: "bad credential" }] });
        }
        //token
        const token = jwt.sign(
            {
                id: findUser._id,
            },
            process.env.SECRET_KEY,
            { expiresIn: "6h" }
        );

        res.status(200).send({
            msg: "login successfully",
            user: findUser,
            token,
        });
    } catch (error) {
        res.status(500).send({ errors: [{ msg: "user not logged in" }] });
    }
};

//get all users
exports.GetAll = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send({ msg: "all users", users });
    } catch (error) {
        console.log(error);
        res.status(500).send({ errors: [{ msg: "error" }] });
    }
};
//get a user
exports.Get = async (req, res) => {
    console.log("this is id", typeof req.params._id);
    const { _id } = req.params;
    try {
        const user = await User.findOne({ _id });
        res.status(200).send({ msg: "user", user });
    } catch (error) {
        console.log(error);
        res.status(500).send({ errors: [{ msg: "can't get user" }] });
    }
};

//update a user
//todo:/updated password should be hashed
exports.Update = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        });
        res.status(200).send({ msg: "user updated successfully", user: User });
    } catch (err) {
        return res.status(500).send({ errors: [{ msg: "user not updated" }] });
    }
};
//delete a user
exports.Delete = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send({ msg: "user deleted successfully", user: User });
    } catch (error) {
        return res.status(500).send({ errors: [{ msg: "user deleted" }] });
    }
};
