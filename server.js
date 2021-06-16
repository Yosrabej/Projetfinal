const express = require("express");
const connectDB = require("./config/connectDB");

const app = express();
require("dotenv").config();

//img upload
var fs = require("fs");
var path = require("path");

connectDB();
app.use(express.json());
app.use("/api/user", require("./router/user"));
app.use("/api/posts", require("./router/posts"));
const PORT = process.env.PORT;

app.listen(PORT, (err) =>
    err ? console.error(err) : console.log(`server is running on PORT ${PORT}`)
);
