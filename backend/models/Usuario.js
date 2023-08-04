const { Schema, model } = require('mongoose');

const usuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio.']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio.']
    },
    imagen: {
        type: String,
        required: [true, 'La imagen es obligatoria.']
    },
    rol: {
        type: String,
        required: true,
        default: 'USER'
    },
    estado: {
        type: Boolean,
        default: true
    },
    googleSignIn: {
        type: Boolean,
        default: true
    }
})

module.exports = model('Usuario', usuarioSchema);