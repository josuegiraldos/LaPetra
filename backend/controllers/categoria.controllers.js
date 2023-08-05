const Categoria = require('../models/Categoria.js');

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
            // Aquí también puedes agregar otros campos del esquema si los tienes
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

module.exports = {
    getCategorias,
    postCategoria,
    deleteCategoria,
    getCategoriaById,
    putCategoria
}