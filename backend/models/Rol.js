const { Schema, model } = require('mongoose');

const rolSchema = Schema({
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio. ROL.MODEL.']
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    }
})

module.exports = model('roles', rolSchema);