const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario.js');

const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('x-api-token-jwt');
    if(!token){
        return res.status(401).json({
            msg: "No existe un token en la petición."
        })
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
        const usuario = await Usuario.findById(uid);
        if(!usuario){
            return res.status(401).json({
                msg: "Token no válido - El usuario no existe en la base de datos."
            })
        }
        if(!usuario.estado){
            return res.status(401).json({
                msg: "Token no válido - El usuario tiene un estado inactivo."
            })
        }

        req.usuario = usuario;
        console.log("Request usuario en validación", req.usuario);
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Token no válido."
        })
    }
}

module.exports = {
    validateJWT
}