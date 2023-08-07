/* const { Schema, model } = require('mongoose');

const direccionSchema = Schema({
  calle: {
    type: String,
    required: [true, 'La calle de la dirección del envío es obligatoria. PEDIDO.MODEL.']
  },
  ciudad: {
    type: String,
    required: [true, 'La ciudad de la dirección del envío es obligatoria. PEDIDO.MODEL.']
  },
  codigo_postal: {
    type: Number,
    required: [true, 'El código postal de la dirección del envío es obligatorio. PEDIDO.MODEL.']
  },
  pais: {
    type: String,
    required: [true, 'El país de la dirección del envío es obligatorio. PEDIDO.MODEL.']
  }
});

const productoSchema = Schema({
  id: {
    type: Schema.Types.ObjectId,
    ref: 'Producto',
    required: [true, 'El ID del producto es obligatorio. PEDIDO.MODEL.'],
  },
  cantidad: {
    type: Number,
    required: [true, 'La cantidad de pedidos de este producto es obligatoria. PEDIDO.MODEL.']
  }
});

const pedidoSchema = Schema({
  usuario: {
    id: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
      required: [true, 'El ID del usuario es obligatorio. PEDIDO.MODEL.'],
    },
    telefono: {
      type: Number,
      required: [true, 'El teléfono del usuario es obligatorio. PEDIDO.MODEL.']
    }
  },
  productos: [productoSchema],
  monto_total: {
    type: Number,
    required: [true, 'El monto total del pedido es obligatorio. PEDIDO.MODEL.']
  },
  direccion_envio: direccionSchema,
  estado: {
    type: Boolean,
    default: true,
    required: true
  }
});

module.exports = model('Pedido', pedidoSchema); */

const { Schema, model } = require('mongoose');

const direccionSchema = Schema({
  calle: {
    type: String,
    required: [true, 'La calle de la dirección del envío es obligatoria. PEDIDO.MODEL.']
  },
  ciudad: {
    type: String,
    required: [true, 'La ciudad de la dirección del envío es obligatoria. PEDIDO.MODEL.']
  },
  codigo_postal: {
    type: Number,
    required: [true, 'El código postal de la dirección del envío es obligatorio. PEDIDO.MODEL.']
  },
  pais: {
    type: String,
    required: [true, 'El país de la dirección del envío es obligatorio. PEDIDO.MODEL.']
  }
});

const productoSchema = Schema({
  id: {
    type: Schema.Types.ObjectId,
    ref: 'Producto',
    required: [true, 'El ID del producto es obligatorio. PEDIDO.MODEL.'],
  },
  cantidad: {
    type: Number,
    required: [true, 'La cantidad de pedidos de este producto es obligatoria. PEDIDO.MODEL.']
  }
  /* precio: {
    type: Number,
    required: [true, 'El precio del producto es obligatorio. PEDIDO.MODEL.']
  } */
});

const pedidoSchema = Schema({
  usuario: {
    id: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
      required: [true, 'El ID del usuario es obligatorio. PEDIDO.MODEL.'],
    },
    telefono: {
      type: Number,
      required: [true, 'El teléfono del usuario es obligatorio. PEDIDO.MODEL.']
    }
  },
  productos: [productoSchema],
  monto_total: {
    type: Number,
    required: [true, 'El monto total del pedido es obligatorio. PEDIDO.MODEL.'],
    default: 0
  },
  direccion_envio: direccionSchema,
  estado: {
    type: Boolean,
    default: true,
    required: true
  }
});

// Función para calcular el monto_total automáticamente antes de guardar el pedido
pedidoSchema.pre('save', function (next) {
  const productos = this.productos;
  let total = 0;

  for (const producto of productos) {
    total += producto.precio * producto.cantidad;
  }

  this.monto_total = total;
  next();
});

module.exports = model('Pedido', pedidoSchema);