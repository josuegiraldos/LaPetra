const { Schema, model } = require('mongoose');

const categoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio.'],
        unique: true
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria.']
    },
    imagen: {
        type: String,
        required: [true, 'La imagen es obligatoria.']
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },

});

module.exports = model('Categoria', categoriaSchema)