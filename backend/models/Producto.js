const { Schema, model } = require('mongoose');

const productoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio.']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion del producto es obligatoria.']
    },
    precio: {
        type: Number,
        required: [true, 'El precio del producto es obligatorio. PRODUCTOS.MODEL']
    },
    imagen: {
        type: String,
        required: [true, 'La imagen del producto es obligatoria. PRODUCTOS.MODEL']
    },
    tallas: [{
        type: String,
        required: [true, 'Las tallas del producto son obligatorias. PRODUCTOS.MODEL']
    }],
    colores: [{
        type: String,
        required: [true, 'Los colores del producto son obligatorios. PRODUCTOS.MODEL']
    }],
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: [true, 'La categoría es obligatoria. PRODUCTOS.MODEL']
    },
    inventario: {
        type: Number,
        required: [true, 'El stock del producto es obligatorio. PRODUCTOS.MODEL']
    },
    estado: {
        type: Boolean,
        default: true
    }
})

module.exports = model('Producto', productoSchema);