const { Router } = require('express');
const { check } = require('express-validator');
const { validateDocuments } = require('../middlewares/validate.documents.js');
const { validateJWT } = require('../middlewares/validate.jwt.js');
const { isAdminRole } = require('../middlewares/validate.role.js');
const { isValidRole, emailExiste, userExistsById } = require('../helpers/db.validators.js');
const { getUsers, postUser, deleteUser, putUser, getUserById } = require('../controllers/usuario.controllers.js');

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", [
    check('nombre', "El nombre no es válido.").not().isEmpty(),
    check('password', 'El password debe ser mínimo de 6 dígitos.').isLength({ min: 6 }),
    check('email', "El email no es válido.").isEmail(),
    check('email').custom(emailExiste),
    check('rol').custom(isValidRole),
    validateDocuments
], postUser);
router.delete("/:id", [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido. USUARIO.CONTROLLERS').isMongoId(),
    check('id').custom(userExistsById),
    validateDocuments
], deleteUser);
router.put("/:id", [
    check('id', 'No es un ID válido.').isMongoId(),
    check('id').custom(userExistsById),
    check('rol').custom(isValidRole),
    validateDocuments
], putUser);

module.exports = router;