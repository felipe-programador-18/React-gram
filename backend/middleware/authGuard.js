const User = require("../models/User")
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET;


const AuthGuard = async (req, res, next) =>{

    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1];

    // check if was a token
    if(!token) return res.status(401).json({errors:["Acesso negado! "]});

    // now i need check my token is validate!!
     
    try{
      const verified = await jwt.verify(token, jwtSecret);
      req.user = await User.findById(verified.id).select("-password")
      next();
    }catch(error){
       res.status(400).json({errors:['Token inválido.']})
  
    }

}


module.exports = AuthGuard;