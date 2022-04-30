const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../db/db")

const Register = async (req, res) =>{
    try{
        const Email = await User.findOne({email:req.body.email})
        if(Email){
            res.status(401).json({msg:"email already exist"})
        }else{
            const password = req.body.password;
            const rewrite = await bcrypt.genSalt(10)
            const change = await bcrypt.hash(password,rewrite)
            const Users = await User.create({
                id:Math.random().valueOf().toString,
                name:req.body.name,
                email:req.body.email,
                password:change
            })
            res.status(200).json({msg:"you have register", data:Users})
        }
    }catch(err){
        res.status(400).json({msg:"erro registering", data:err.message})
    }
}

const SignIn = async (req, res) =>{
    try{
       const {email,password} = req.body;
       const chechEmail = await User.findOne({email})
       if(chechEmail){

           const checkPassword = bcrypt.compare(password,chechEmail.password) 

           if(checkPassword){
                const {password, ...info} = chechEmail._doc;
                const token = jwt.sign({
                    name:chechEmail.name,
                    email:chechEmail.email
                },"dvbuuefbeiodsei",{expires:"3d"})
                res.status(200).json({msg:`welcome Back ${checkPassword.name}`, data:{...info,token}})
           }else{
               res.status(401).json({msg:"incorrect password"})
           }

       }else{
           res.status(400).json({msg:"no user with this email"})
       }
        res.status(200).json({msg:"you have register", data:Users})
    }catch(err){
        res.status(400).json({msg:"erro registering", data:err.message})
    }
}

module.exports = {
    Register,
    SignIn,
}
