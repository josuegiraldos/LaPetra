const Categoria = require('../models/Categoria.js');
const Producto = require('../models/Producto.js');

const getCategorias = async (req, res) => {
    try {
        const { hasta, desde } = req.query;
        const query = { estado: true };

        const [ total, categorias ] = await Promise.all([
            Categoria.countDocuments(query),
            Categoria.find(query)
            .skip(Number(desde))
            .limit(Number(hasta))
        ])

        res.json({
            total,
            categorias
        })
    } catch (error) {
        console.log(error.message);
    }
}

const postCategoria = async (req, res) => {
    try {
        const { nombre, descripcion, imagen, estado } = req.body;
        const categoriaDB = await Categoria.findOne({ nombre });

        if (categoriaDB) {
            return res.status(400).json({
                msg: `La categoría ${categoriaDB.nombre} ya existe en la base de datos. CATEGORIA.CONTROLLERS`
            });
        }

        const data = {
            nombre,
            descripcion,
            imagen,
            estado
        };

        const categoria = new Categoria(data);
        await categoria.save();

        res.status(201).json(categoria);
    } catch (error) {
        console.log(error);
    }
}   

const deleteCategoria = async (req, res) => {
    try {
        const {id} = req.params;
        const categoria = await Categoria.findByIdAndUpdate(id, {estado: false});
        res.status(201).json({
            msg: "Categoria eliminada correctamente",
            categoria
        })
    } catch (error) {
        console.log(error);
    }
}

const getCategoriaById = async (req, res) => {
    try {
        const categoria = await Categoria.findOne({_id: req.params.id});
        res.json(categoria);
    } catch (error) {
        console.log(error);
    }
}

const putCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { _id, ...resto } = req.body;
        const categoria = await Categoria.findByIdAndUpdate(id, resto, { new: true });

        res.json({
            msg: "Categoría actualizada.",
            categoria
        })
    } catch (error) {
        console.log(error);
    }
}

const getProductosPorCategoria = async (req, res) => {
    try {
        const { id } = req.params;

        const query = {
            categoria: id,
            estado: true
        }

        const [ total, productos ] = await Promise.all([
            Producto.countDocuments(query),
            Producto.find(query)
        ]);

        const categoria = await Categoria.findById(id);
        if (!categoria) {
            return res.status(404).json({ msg: 'Categoría no encontrada.' });
        }

        console.log("ID de la categoria:", id);
        console.log("Resultado de la búsqueda:", productos);

        res.json({
            total,
            msg: 'Productos filtrados por categoría.',
            categoria,
            productos
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener productos por categoría.'
        });
    }
};

module.exports = {
    getCategorias,
    postCategoria,
    deleteCategoria,
    getCategoriaById,
    putCategoria,
    getProductosPorCategoria
}