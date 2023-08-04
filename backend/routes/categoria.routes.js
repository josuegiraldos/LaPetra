const { Router } = require('express');
const { check } = require('express-validator');
const { validateDocuments } = require('../middlewares/validate.documents.js');
const { validateJWT } = require('../middlewares/validate.jwt.js');
const { categoriaExiste } = require('../helpers/db.validators.js');
const { isAdminRole } = require('../middlewares/validate.role.js');
const { getCategorias, postCategoria, getCategoriaById, deleteCategoria, putCategoria } = require('../controllers/categoria.controllers.js')

const router = Router();

router.get("/", getCategorias);
router.get("/:id", getCategoriaById);
router.post("/", [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(categoriaExiste),
    validateDocuments
], postCategoria);
router.delete("/:id", [
    validateJWT,
    isAdminRole,
    check('id', "No es un ID válido.").isMongoId(),
    check('id').custom(categoriaExiste),
    validateDocuments
], deleteCategoria);
router.put("/:id", [
    check('id', "No es un ObjectId MongoDB válido.").isMongoId(),
    check('id').custom(categoriaExiste),
    validateDocuments
], putCategoria);

module.exports = router;