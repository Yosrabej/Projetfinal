const express = require("express");
const connectDB = require("./config/connectDB");
const path = require("path");
const app = express();
require("dotenv").config();

//img upload
var fs = require("fs");
var path = require("path");

connectDB();
app.use(express.json());
app.use("/api/user", require("./router/user"));
app.use("/api/posts", require("./router/posts"));

//Serve static assets if in production
if (process.env.NODE_ENV === "rpoduction")
    //Set static folder
    app.use(express.static("client/build"));
app.get("*", (req, res) => {
    res.sendFile(path.resolve__dirname, "client", "build", "index.html");
});

const PORT = process.env.PORT;

app.listen(PORT, (err) =>
    err ? console.error(err) : console.log(`server is running on PORT ${PORT}`)
);
