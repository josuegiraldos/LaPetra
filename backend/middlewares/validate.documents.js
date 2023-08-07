const { validationResult } = require('express-validator');

const validateDocuments = (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json(errors);
        }
        next();
    } catch (error) {
        console.log(error.message);
        res.json({
            msg: "Error encontrado. VALIDATE.DOCUMENTS"
        })
    }
}

module.exports = {
    validateDocuments
}