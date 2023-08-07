const Pedido = require('../models/Pedido.js');
const Producto = require('../models/Producto.js')

const getPedidos = async (req, res) => {
    try {
        const { hasta, desde } = req.query;
        const query = { estado: true };
        const [ total, pedidos ] = await Promise.all([
            Pedido.countDocuments(query),
            Pedido.find(query)
                .populate('usuario.id', 'nombre email')
                .populate('productos.id', 'nombre precio')
                .skip(Number(desde))
                .limit(Number(hasta))
        ])

        res.json({
            msg: "Pedidos hallados en la base de datos.",
            total,
            pedidos
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al obtener pedido. PEDIDO.CONTROLLER"
        })
    }
}

const getPedidoById = async (req, res) => {
    try {
        const pedido = await Pedido.findOne({ _id: req.params.id })
            .populate('usuario.id', 'nombre email')
            .populate('productos.id', 'nombre precio') 
        
        res.status(201).json({
            msg: "Pedido hallado por ID.",
            pedido
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al obtener pedido por ID. PEDIDO.CONTROLLER"
        })
    }
}

const deletePedido = async (req, res) => {
    try {
        const { id } = req.params;
        const pedido = await Pedido.findByIdAndUpdate(id, { estado: false });

        res.status(201).json({
            msg: "Pedido eliminado correctamente.",
            pedido
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al eliminar pedido. PEDIDO.CONTROLLER"
        })
    }

}

const postPedido = async (req, res) => {
    try {
        const { usuario, telefono, productos, direccion_envio, estado } = req.body;

        let monto_total = 0;

        for (const producto of productos) {
            const productoDB = await Producto.findById(producto.id);

            if (!productoDB) {
                return res.status(404).json({
                    msg: "Producto no encontrado. PEDIDO.CONTROLLERS"
                });
            }

            const montoParcial = productoDB.precio * producto.cantidad;

            monto_total += montoParcial;
        }

        monto_total = parseFloat(monto_total.toFixed(2));

        const nuevoPedido = new Pedido({
            usuario: {
                id: usuario,
                telefono: telefono
            },
            productos: productos,
            monto_total: monto_total,
            direccion_envio: direccion_envio,
            estado
        });

        const pedidoGuardado = await nuevoPedido.save();

        res.status(201).json({
            msg: "Pedido creado exitosamente.",
            pedido: pedidoGuardado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al crear pedido. PEDIDO.CONTROLLER"
        });
    }
};


const putPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const { productos, direccion_envio } = req.body;

        let monto_total = 0;

        for (const producto of productos) {
            const productoDB = await Producto.findById(producto.id);

            if (!productoDB) {
                return res.status(404).json({
                    msg: "Producto no encontrado. PEDIDO.CONTROLLERS"
                });
            }

            const montoParcial = productoDB.precio * producto.cantidad;

            monto_total += montoParcial;
        }

        monto_total = parseFloat(monto_total.toFixed(2));

        const pedidoActualizado = await Pedido.findByIdAndUpdate(
            id,
            { productos: productos, monto_total: monto_total, direccion_envio },
            { new: true }
        );

        res.status(201).json({
            msg: "Pedido actualizado correctamente.",
            pedido: pedidoActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al actualizar pedido. PEDIDO.CONTROLLER"
        });
    }
};

module.exports = {
    getPedidos,
    getPedidoById,
    postPedido,
    deletePedido,
    putPedido
}