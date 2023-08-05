const Producto = require("../models/Producto.js");



const getProductos = async (req, res) => {
    try {
        const { hasta, desde } = req.query;
        const query = { estado: true };
        const [ total, productos ] = await Promise.all([
            Producto.countDocuments(query),
            Producto.find(query)
                .populate('categoria', 'nombre')
                .skip(Number(desde))
                .limit(Number(hasta))
        ])

        res.json({
            msg: "Productos hallados en la base de datos.",
            total,
            productos
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al obtener producto. PRODUCTO.CONTROLLER"
        })
    }
}

const getProductoById = async (req, res) => {
    try {
        const producto = await Producto.findOne({ _id: req.params.id });
        res.status(201).json({
            msg: "Producto hallado por ID",
            producto
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al obtener producto por ID. PRODUCTO.CONTROLLER"
        })
    }

}

const postProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio, imagen, tallas, colores, categoria, inventario, estado } = req.body;

        const producto = new Producto({ nombre, descripcion, precio, imagen, tallas, colores, categoria, inventario, estado });

        await producto.save();
        res.status(201).json({
            msg: "Producto agregado correctamente.",
            producto
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al agregar producto. PRODUCTO.CONTROLLER"
        })
    }
}

const deleteProducto = async (req, res) => {
    try {
        const { id } = req.params;

        const producto = await Producto.findByIdAndUpdate(id, { estado: false });

        res.status(201).json({
            msg: "Producto eliminado correctamente.",
            producto
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al eliminar producto. PRODUCTO.CONTROLLER"
        })
    }
}

const putProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { _id, ...resto } = req.body;

        const producto = await Producto.findByIdAndUpdate(id, resto, { new: true });

        res.status(200).json({
            msg: "Producto actualizado correctamente.",
            producto
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al actualizar producto. PRODUCTO.CONTROLLER"
        })
    }
}

module.exports = {
    getProductos,
    getProductoById,
    postProducto,
    deleteProducto,
    putProducto
}