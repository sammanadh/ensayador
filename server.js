const app = require("./app")
const dotenv = require("dotenv");

dotenv.config({path: `${__dirname}/config.env`});

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Client served on port ${port}`);
})