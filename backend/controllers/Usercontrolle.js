const User = require("../models/User")
const bycript = require("bcryptjs")

const jwt = require("jsonwebtoken")

const jwtScret = process.env.JWT_SECRET;

//create function to genenate jwt to acess in webpage

const generateToken = (id) => {
    return jwt.sign({id},
         jwtScret,{
        expiresIn:"7d",
    });
}


//register user and sing in
const register = async (req, res) => {
   res.send("Register")
}


module.exports = {
    register
}