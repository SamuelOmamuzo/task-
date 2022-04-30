const mongoose = require("mongoose")

const Data = mongoose.Schema({
    id:{
        type:String,
        default:false
    },
    name:{
        type:String
    },
    email:{
        type:String,
    },
    password:{
        type:String
    }
})

module.exports = mongoose.model("user", Data)