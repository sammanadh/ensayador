const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const fs = require("fs");

const app = express();

// For serving files like css files, images and javascript files inside of static folder
app.use("/static", express.static(path.resolve(__dirname, "static")));


// Route that returns html template files
app.use("/template/*", async (req, res, next)=>{
    const comp = req.originalUrl.replace("/template", "");
    fs.readFile(`${__dirname}/static/js/components/${comp}`, 'utf8', function(err, data){ 
        if(err){
            res.send(console.log(err));
        }
        // Display the file content
        res.status(200).json({
            data: data.toString()
        })
    }); 
})

app.use("/*", async(req,res,next)=>{
    res.sendFile(path.resolve(__dirname, "index.html"));
})


dotenv.config({path: `${__dirname}/config.env`});

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Client served on port ${port}`);
})