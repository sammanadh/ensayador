const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const fs = require("fs");

const app = express();

// For any javascript files
app.use("/static/js", express.static(path.resolve(__dirname, "static", "js")));

// For css files
app.use("/static/css", express.static(path.resolve(__dirname, "static", "css")));

// For assets like images
app.use("/static/assets", express.static(path.resolve(__dirname, "static", "assets")));


// Route that returns html template files
app.use("/template/*", async (req, res, next)=>{
    const page = req.originalUrl.replace("/template", "");
    fs.readFile(`${__dirname}/static/js/pages/${page}`, 'utf8', function(err, data){ 
      if(err){
          res.send(console.log(err));
      }
        // Display the file content
        res.status(200).json({
            data: data.toString()
        })
    }); 
})

app.use("/*", (req,res,next)=>{
    res.sendFile(path.resolve(__dirname, "index.html"));
})


dotenv.config({path: `${__dirname}/config.env`});

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Client served on port ${port}`);
})