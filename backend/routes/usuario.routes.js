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
    validateJWT,
    isAdminRole,
    check('nombre', "El nombre no es válido. USUARIO.ROUTES").not().isEmpty(),
    check('password', 'El password debe ser mínimo de 6 dígitos. USUARIO.ROUTES').isLength({ min: 6 }),
    check('email', "El email no es válido. USUARIO.ROUTES").isEmail(),
    check('email').custom(emailExiste),
    check('rol').custom(isValidRole),
    validateDocuments
], postUser);
router.delete("/:id", [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido. USUARIO.ROUTES').isMongoId(),
    check('id').custom(userExistsById),
    validateDocuments
], deleteUser);
router.put("/:id", [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido. USUARIO.ROUTES.').isMongoId(),
    check('id').custom(userExistsById),
    check('rol').custom(isValidRole),
    validateDocuments
], putUser);

module.exports = router;