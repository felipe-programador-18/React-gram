const { body } = require("express-validator")

// this structure is about my user and create login and another things!!
const userCreateValidation = () => {
    return [body("name")
    .isString()
    .withMessage("o nome precisa ser obrigatório")
    .isLength({min:3})
    .withMessage("o nome precisa ter no minimo 3 caracteres !!"),
    
    body("email")
    .isString()
    .withMessage("O email é obrigatório")
    .isEmail()
    .withMessage("Insira um email valido."),
    
    body("password")
    .isString()
    .withMessage("A senha é obrigatória.")
    .isLength({min:8})
    .withMessage("o senha precisa ter no minimo 8 caracteres !!"),

    body("confirmPassword")
    .isString()
    .withMessage("Confirmação de senha é Obrigatória.")
    .custom((value,{req}) => {
        if(value != req.body.password){
          throw new Error('A senhas não são iguais !!')
        }
        return true;
    })

];
}

const loginValidation = () => {
    return [
        body("email")
        .isString()
        .withMessage("O e-mail é obrigatório.")
        .isEmail()
        .withMessage("Insira um e-mail válido."),

        body("password")
        .isString()
        .withMessage("A senha é obrigatória.")

    ]
}


const userUpdateValidation = () => {
   return [
    body("name")
    .optional()
    .isLength({min:3})
    .withMessage("O nome precisa de pelo menos 3 caracteres."),
    
    body("password")
    .optional()
    .isLength({min:8})
    .withMessage("A senha precisa ter no minimo 8 caracteres.")
   ]
}




module.exports = {
    userCreateValidation,
    loginValidation,
    userUpdateValidation
};