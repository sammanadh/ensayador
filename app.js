const express = require("express");
const path = require("path");

const app = express();


app.use("/static", express.static(path.resolve(__dirname, "static")));

app.use("/*", (req,res,next)=>{
    res.sendFile(path.resolve(__dirname, "index.html"));
})

module.exports = app;