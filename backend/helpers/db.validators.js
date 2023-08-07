const Roles = require('../models/Rol.js');
const Usuario = require('../models/Usuario.js');
const Categoria = require('../models/Categoria.js');
const Producto = require('../models/Producto.js');
const Pedido = require('../models/Pedido.js');

const isValidRole = async (rol = '') => {
    const existeRol = await Roles.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no está registrado en la base de datos. DB.VALIDATORS.`);
    }
}

const emailExiste = async (email = '') => {
    const existeEmail = await Usuario.findOne({email});
    if(existeEmail){
        throw new Error(`El email ${email} ya está registrado. DB.VALIDATORS.`)
    }
}

const userExistsById = async (id) => {
    const userExists = await Usuario.findById(id);
    if(!userExists){
        throw new Error(`El ID ${id} (usuario) no existe. DB.VALIDATORS.`);
    }
}

const categoriaExiste = async (id) => {
    const categoriaExists = await Categoria.findById(id);
    if(!categoriaExists){
        throw new Error(`El ID ${id} (categoria) no existe. DB.VALIDATORS.`);
    }
}

const productoExistsById = async (id) => {
    const productoExiste = await Producto.findById(id);

    if(!productoExiste){
        throw new Error(`El ID ${id} (producto) no existe. DB.VALIDATORS.`);
    }
}

const rolExistsById = async (id) => {
    const rolExiste = await Roles.findById(id);

    if(!rolExiste){
        throw new Error(`El ID ${id} (rol) no existe. DB.VALIDATORS.`);
    }
}

const pedidoExistsById = async (id) => {
    const pedidoExiste = await Pedido.findById(id);
    if(!pedidoExiste){
        throw new Error(`El ID ${id} (pedido) no existe. DB.VALIDATORS.`);
    }
}

module.exports = {
    isValidRole,
    emailExiste,
    userExistsById,
    categoriaExiste,
    productoExistsById,
    rolExistsById,
    pedidoExistsById
}