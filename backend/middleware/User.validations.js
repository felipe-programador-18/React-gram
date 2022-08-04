const { body } = require("express-validator")

const userCreateValidation = () => {
    return [body("name").isString().withMessage("o nome precisa ser obrigatório")];
}

module.exports = {
    userCreateValidation,
};