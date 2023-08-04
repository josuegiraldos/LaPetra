const { response } = require('express');
const Usuario = require('../models/Usuario.js');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate.JWT.js');

const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ email });
        if(!usuario){
            return res.status(400).json({
                msg: "Usuario no es correcto."
            })
        }

        if(!usuario.estado){
            return res.status(400).json({
                msg: "El usuario está inactivo."
            })
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: "Contraseña incorrecta."
            })
        }

        const token = await generateJWT(usuario.id);

        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        return res.json({
            msg: "Login fallido. Contacte al servicio técnico."
        })
    }
}

module.exports = {
    login
}