const Producto = require("../models/Producto.js");

const getProductos = async (req, res) => {
    try {
        const { hasta, desde } = req.query;
        const query = { estado: true };
        const { total, productos } = await Promise.all([
            Producto.countDocuments(query),
            Producto.find(query)
                .skip(Number(desde))
                .limit(Number(hasta))
        ])

        res.json({
            total,
            productos
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getProductos
}