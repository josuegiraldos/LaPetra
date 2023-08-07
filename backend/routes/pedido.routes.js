const { Router } = require('express');
const { check } = require('express-validator');
const { validateDocuments } = require('../middlewares/validate.documents.js');
const { validateJWT } = require('../middlewares/validate.jwt.js');
const { isAdminRole } = require('../middlewares/validate.role.js');
const { pedidoExistsById } = require('../helpers/db.validators.js');
const { getPedidos, getPedidoById, postPedido, deletePedido, putPedido } = require('../controllers/pedido.controllers.js');

const router = Router();

router.get("/", getPedidos);

router.get("/:id", getPedidoById);

router.post("/", [
    validateJWT,
    isAdminRole,
    check('usuario', 'Agregar el usuario es obligatorio. PEDIDO.ROUTES').not().isEmpty(),
    check('telefono', 'Debe ingresar un teléfono. PEDIDO.ROUTES.').not().isEmpty(),
    check('productos', 'Debe ingresar al menos un producto. PEDIDO.ROUTES.').not().isEmpty(),
    check('direccion_envio', 'Debe ingresar la dirección del envío. PEDIDO.ROUTES.').not().isEmpty(),
    validateDocuments
], postPedido)

router.delete("/:id", [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido. PEDIDO.ROUTES.').not().isEmpty(),
    check('id').custom(pedidoExistsById),
    validateDocuments
], deletePedido);

router.put("/:id", [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido. PEDIDO.ROUTES.').not().isEmpty(),
    check('id').custom(pedidoExistsById),
    validateDocuments
], putPedido);

module.exports = router;