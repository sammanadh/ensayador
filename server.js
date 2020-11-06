const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

const app = express();

app.use("/static", express.static(path.resolve(__dirname, "static")));
app.use("/pages", express.static(path.resolve(__dirname, "pages")));

app.use("/*", (req,res,next)=>{
    res.sendFile(path.resolve(__dirname, "index.html"));
})

dotenv.config({path: `${__dirname}/config.env`});

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Client served on port ${port}`);
})