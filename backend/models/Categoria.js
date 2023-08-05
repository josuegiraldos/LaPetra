const { Schema, model } = require('mongoose');

const categoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio. CATEGORIA.MODEL."],
        unique: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: [true, "La descripción es obligatoria. CATEGORIA.MODEL"],
        trim: true
    },
    imagen: {
        type: String,
        required: [true, "La imagen es obligatoria. CATEGORIA.MODEL"],
        trim: true
    },
    estado: {
        type: Boolean,
        required: true,
        default: true
    }
})

module.exports = model('Categoria', categoriaSchema)