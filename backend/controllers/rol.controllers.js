const Rol = require('../models/Rol.js');

const getRoles = async (req, res) => {
    try {
        const { hasta, desde } =req.query;
        const query = { estado: true };
        const [ total, roles ] = await Promise.all([
            Rol.countDocuments(query),
            Rol.find(query)
                .skip(Number(desde))
                .limit(Number(hasta))
        ])

        res.json({
            msg: "Roles hallados en la base de datos.",
            total,
            roles
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al obtener roles. ROL.CONTROLLER."
        })
    }
}

const getRolById = async (req, res) => {
    try {
        const rol = await Rol.findOne({ _id: req.params.id });
        res.status(201).json({
            msg: "Rol hallado por ID.",
            rol
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al obtener rol por ID. ROL.CONTROLLER."
        })
    }
}

const postRol = async (req, res) => {
    try {
        const { rol, estado } = req.body;

        const newRol = new Rol({ rol, estado });

        await newRol.save();
        res.status(201).json({
            msg: "Rol agregado correctamente.",
            newRol
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al agregar rol. ROL.CONTROLLER."
        })
    }
}

const deleteRol = async (req, res) => {
    try {
        const { id } =req.params;

        const rol = await Rol.findByIdAndUpdate(id, { estado: false });

        res.status(201).json({
            msg: "Rol eliminado correctamente.",
            rol
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al eliminar rol. ROL.CONTROLLER."
        })
    }
}

const putRol = async (req, res) => {
    try {
        const { id } = req.params;
        const { _id, ...resto } = req.body;

        const role = await Rol.findByIdAndUpdate(id, resto, { new: true });

        res.status(201).json({
            msg: "Rol actualizado correctamente.",
            role
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al actualizar rol. ROL.CONTROLLER."
        })
    }
}

module.exports = {
    getRoles,
    getRolById,
    postRol,
    deleteRol,
    putRol
}