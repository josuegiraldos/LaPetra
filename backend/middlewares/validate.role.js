const isAdminRole = (req, res, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: "Es necesario verificar el rol antes de validar el token."
        })
    }

    const { rol, nombre } = req.usuario;
    if (rol !== "ADMIN") {
        return res.status(401).json({
            msg: `${nombre} no es ADMIN - No se permite realizar la acción.`
        })
    }
    next();
}

module.exports = {
    isAdminRole
}