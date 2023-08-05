const { Router } = require('express');
const { check } = require('express-validator');
const { validateDocuments } = require('../middlewares/validate.documents.js');
const { validateJWT } = require('../middlewares/validate.jwt.js');
const { isAdminRole } = require('../middlewares/validate.role.js');
const { rolExistsById } = require('../helpers/db.validators.js');
const { getRoles, getRolById, postRol, deleteRol, putRol } = require('../controllers/rol.controllers.js');

const router = Router();

router.get("/", getRoles);

router.get("/:id", getRolById);

router.post("/", [
    validateJWT,
    isAdminRole,
    check('rol', "El nombre del rol es obligatorio. ROL.CONTROLLER.").not().isEmpty(),
    validateDocuments
], postRol);

router.delete("/:id", [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido. ROL.ROUTES.').isMongoId(),
    check('id').custom(rolExistsById),
    validateDocuments
], deleteRol);

router.put("/:id", [
    validateJWT,
    isAdminRole,
    check('id', "No es un ID válido. ROL.ROUTES.").isMongoId(),
    check('id').custom(rolExistsById),
    validateDocuments
], putRol);

module.exports = router;