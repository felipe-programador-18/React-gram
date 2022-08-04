const User = require("../models/User")
const bcrypt = require("bcryptjs")
const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");


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
   
    const {name, email, password} = req.body;

    //chech if user exist!

    const user = await User.findOne({email})

    if(user){
        res.status(422).json({errors:["Por favor utilize outro Email"]})
        return
    }
    
    //generate password hash this turn password cripty  
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password,salt)
    
    //createUser now
    const createUser = await new User.create({
      name,
      email,
      password : passwordHash  
    })

    // if check was created if succeed return token

    if(!createUser){
        res.status(422).json({errors: ["houve um erro, por favor tente mais tarde!"]})
        return
    }

    res.status(201).json({
         _id: createUser._id,
         token: generateToken(createUser._id)
    })

}

module.exports = {
    register,
}