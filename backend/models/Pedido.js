const { Schema, model } = require('mongoose');

const pedidoSchema = Schema({
    usuario: {
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
            required: [true, 'El ID usuario es obligatorio']
        },
        nombre: {
            type: String,
            required: [true, 'El nombre del usuario es obligatorio.']
        },
        email: {
            type: String,
            required: [true, 'El email del usuario es obligatorio.']
        },
        telefono: {
            type: Number,
            required: [true, 'El telefono del usuario es obligatorio.']
        },
        direccion: {
            calle: {
                type: String,
                required: [true, 'La direccion del usuario es obligatoria.']
            },
            ciudad: {
                type: String,
                required: [true, 'La ciudad del usuario es obligatoria.']
            },
            codigo_postal: {
                type: Number,
                required: [true, 'El código postal del usuario es obligatorio.']
            },
            pais: {
                type: String,
                required: [true, 'El pais del usuario es obligatorio.']
            }
        }
    },
    productos: [{
        id: {
            type: Schema.Types.ObjectId,
            required: [true, 'El ID del producto es obligatorio.']
        },
        nombre: {
            type: String,
            required: [true, 'El nombre del producto es obligatorio.']
        },
        precio: {
            type: Number,
            required: [true, 'El precio del producto es obligatorio.']
        },
        cantidad: {
            type: Number,
            required: [true, 'La cantidad de pedidos de este producto es obligatoria.']
        }
    }],
    monto_total: {
        type: Number,
        required: [true, 'El monto total del pedido es obligatorio.']
    },
    direccion_envio: {
        nombre: {
            type: String,
            required: [true, 'El nombre del usuario es obligatorio.']
        },
        calle: {
            type: String,
            required: [true, 'La calle de la dirección del envío es obligatoria.']
        },
        ciudad: {
            type: String,
            required: [true, 'La ciudad de la dirección del envío es obligatoria.']
        },
        codigo_postal: {
            type: Number,
            required: [true, 'El código postal de la dirección del envío es obligatoria.']
        },
        pais: {
            type: String,
            required: [true, 'El pais de la dirección del envío es obligatorio.']
        }
    }
})

module.exports = model('Pedido', pedidoSchema);