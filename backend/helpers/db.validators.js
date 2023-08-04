const Roles = require('../models/Rol.js');
const Usuario = require('../models/Usuario.js');
const Categoria = require('../models/Categoria.js');

const isValidRole = async (rol = '') => {
    const existeRol = await Roles.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no está registrado en la base de datos.`);
    }
}

const emailExiste = async (email = '') => {
    const existeEmail = await Usuario.findOne({email});
    if(existeEmail){
        throw new Error(`El email ${email} ya está registrado.`)
    }
}

const userExistsById = async (id) => {
    const userExists = await Usuario.findById(id);
    if(!userExists){
        throw new Error(`El ID ${id} (usuario) no existe.`);
    }
}

const categoriaExiste = async (id) => {
    const categoriaExists = await Categoria.findById(id);
    if(!categoriaExists){
        throw new Error(`El ID ${id} (categoria) no existe.`);
    }
}

module.exports = {
    isValidRole,
    emailExiste,
    userExistsById,
    categoriaExiste
}