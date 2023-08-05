const Usuario = require('../models/Usuario.js');
const bcryptjs = require('bcryptjs');

const getUsers = async (req, res) => {
    try {
        const { hasta, desde } = req.query;
        const query = { estado: true };
        const [ total, usuarios ] = await Promise.all([
            Usuario.countDocuments(query),
            Usuario.find(query)
                .skip(Number(desde))
                .limit(Number(hasta))
        ]);

        res.json({
            total,
            usuarios
        })
    } catch (error) {
        console.log(error);
    }
}

const postUser = async (req, res) => {
    try {
        const { nombre, email, password, imagen, rol } = req.body;

        const usuario = new Usuario({ nombre, email, password, imagen, rol });

        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);

        await usuario.save();
        res.json({
            msg: "Usuario agregado correctamente.",
            usuario
        })
    } catch (error) {
        console.log(error);
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
        res.status(201).json({
            msg: "Usuario eliminado correctamente.",
            usuario
        })
    } catch (error) {
        console.log(error);
    }
}

const putUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { _id, password, googleSignIn, ...resto } = req.body;

        if(password){
            const salt = bcryptjs.genSaltSync();
            resto.password = bcryptjs.hashSync(password, salt);
        }

        const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

        res.json({
            msg: "Usuario actualizado correctamente.",
            usuario
        })
    } catch (error) {
        console.log(error);
    }
}

const getUserById = async (req, res) => {
    try {
        const usuario = await Usuario.findOne({_id: req.params.id});
        res.json(usuario);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getUsers,
    postUser,
    deleteUser,
    putUser,
    getUserById
}