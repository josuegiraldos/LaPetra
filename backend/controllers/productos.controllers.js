const Producto = require("../models/Producto.js");
const Categoria = require("../models/Categoria.js");

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

const getProductosPorCategoria = async (req, res) => {
    try {
        console.log('Paso 1: Iniciando búsqueda de productos por categoría');
        const { categoriaId } = req.params;
        
        const query = { 
            categoria: "64cadc244cea9c702c3c1606",
            estado: true
        };
        
        console.log('Paso 2: Consulta de búsqueda:', query);
        
        const [ total, productos ] = await Promise.all([
            Producto.countDocuments(query),
            Producto.find(query)
                .populate('categoria', 'nombre')
        ]);
        
        console.log('Paso 3: Resultado de la búsqueda de productos:', productos);

        res.json({
            total,
            msg: "Productos filtrados por categoría.",
            Categoria: categoriaId,
            productos
        });

        console.log('Paso 4: Búsqueda de productos por categoría completada exitosamente');
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            msg: "Error al obtener productos por categoría. PRODUCTO.CONTROLLER"
        });
    }
};


module.exports = {
    getProductos,
    getProductoById,
    postProducto,
    deleteProducto,
    putProducto,
    getProductosPorCategoria
}