const express = require("express")
const Route = express.Router()
const {Register} =require("../controller/userController")

Route.route("/register")
    .post(Register)

Route.route("/register")
    .post(Register)


module.exports = Route