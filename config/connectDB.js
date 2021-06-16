const mongoose = require("mongoose");

const path = require("path");
require("dotenv").config({ path: "./.env" });
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
        });
        console.log("database is connected");
    } catch (error) {
        console.log("database is not connected", error);
    }
};

module.exports = connectDB;
