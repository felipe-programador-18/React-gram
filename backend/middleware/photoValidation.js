const {body} = require("express-validator")

//removed about bodyparser//

var bodyParser = require('body-parser')
bodyParser.json([body])

const photoInsertValidation = () =>{
 
    return [
        body("title")
        .not()
        .equals("undefined")
        .withMessage("o titulo é obrigatório.")
        .isString()
        .withMessage("o titulo é obrigatório.")
        .isLength({min:6})
        .withMessage("o titulo precisa ter pelo menos 6, caracteres!!"),

        body("image")
        .custom((value, {req} ) => {
            if(!req.file){
                throw new Error("A imagem é obrigatória.")            
            }
            return true;
        })
    ]


}



module.exports = {
    photoInsertValidation,
}