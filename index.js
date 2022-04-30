const express = require ("express");
const path = require("./route/route")
const  mongoose = require("mongoose");
const port = 3500;
const cors = require("cors")
const app = express();

const url = "mongodb://localhost/work"

mongoose.connect(url).then(()=>{
    console.log("db connected")
})

app.use(cors("*"))
app.use("/", path)

app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})