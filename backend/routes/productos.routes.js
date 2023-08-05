const { Router } = require('express');
const { check } = require('express-validator');
const { validateDocuments } = require('../middlewares/validate.documents.js');
const { validateJWT } = require('../middlewares/validate.jwt.js');
const { isAdminRole } = require('../middlewares/validate.role.js');
const { productoExistsById } = require('../helpers/db.validators.js');
const { getProductos, getProductoById, postProducto, deleteProducto, putProducto } = require('../controllers/productos.controllers.js')

const router = Router();

router.get("/", getProductos);

router.get("/:id", getProductoById);

router.post("/", [
    validateJWT,
    isAdminRole,
    check('nombre', "El nombre del producto es obligatorio. PRODUCTO.ROUTES.").not().isEmpty(),
    check('descripcion', "La descripción del producto es obligatoria. PRODUCTO.ROUTES.").not().isEmpty(),
    check('precio', "El precio del producto es obligatorio. PRODUCTO.ROUTES.").not().isEmpty(),
    check('imagen', "La imagen del producto es obligatoria. PRODUCTO.ROUTES.").not().isEmpty(),
    check('tallas', "Debe agregar por lo menos una talla para el producto. PRODUCTO.ROUTES.").not().isEmpty(),
    check('colores', 'Debe agregar el color del producto. PRODUCTO.ROUTES').not().isEmpty(),
    check('categoria', "No es un ID válido. PRODUCTO.ROUTES.").isMongoId(),
    check('inventario', "Debe agregar el stock del producto. PRODUCTO.ROUTES.").not().isEmpty(),
    validateDocuments
], postProducto);

router.delete("/:id", [
    validateJWT,
    isAdminRole,
    check('id', "No es un ID válido. PRODUCTO.ROUTES").isMongoId(),
    check('id').custom(productoExistsById),
    validateDocuments
], deleteProducto);

router.put("/:id", [
    validateJWT,
    isAdminRole,
    check('id').custom(productoExistsById),
    check('id', "No es un ID válido. PRODUCTO.ROUTES.").isMongoId(),
    validateDocuments
], putProducto);

module.exports = router;