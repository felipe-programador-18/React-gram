const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");


const jwtSecret = process.env.JWT_SECRET;

//create function to genenate jwt to acess in webpage

const generateToken = (id) => {
    return jwt.sign({id},
         jwtSecret,{
        expiresIn:"7d",
    });
}

//register user and sing in
const register = async (req, res) => {
   
    const {name, email, password} = req.body;

    //chech if user exist!

    const user = await User.findOne({email})

    if(user){
        res
        .status(422)
        .json({errors:["Por favor utilize outro Email"]})
        return;
    }
    
    //generate password hash this turn password cripty  
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password,salt)
    
    //createUser now
    const createUser = await  User.create({
      name,
      email,
      password : passwordHash  
    })

    // if check was created if succeed return token

    if(!createUser){
        res
        .status(422)
        .json({errors: ["houve um erro, por favor tente mais tarde!"]})
        return;
    }

    res.status(201).json({
         _id: createUser._id,
         token: generateToken(createUser._id)
    })

}

//sing user in
const login = async  (req,res) => {
   const {email, password} = req.body ;
    
   const user = await User.findOne({email})
   // check if my users exist 
   console.log("find users logeed", user)
   if(!user){
    res.status(404).json({errors:["Usuário não encontrado"]})
    return
   }

   //check if password methods
   if(!(await bcrypt.compare(password, user.password) )){
    res.status(422).json({erros:['Senha inválida.']})
    return
   }
    
   // now i need return with users with token!!
   res.status(201).json({
    _id: user._id,
    profileImage: user.profileImage ,
    token: generateToken(user._id)
   })

}

// create function to get currently logged

const getCurrentUser = async  (req, res) => {
   //const {user}= await req.user
   //console.log("teest user", user)
   try{
    const user = await req.user
    res.status(200).json(user)
    getCurrentUser()
   }catch(err){
    console.log("error here", err)
   }
   //res.status(200).json(user);

}




module.exports = {
    register,
    login,
    getCurrentUser
}