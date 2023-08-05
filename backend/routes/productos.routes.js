const { Router } = require('express');
const { check } = require('express-validator');
const { validateDocuments } = require('../middlewares/validate.documents.js');
const { validateJWT } = require('../middlewares/validate.jwt.js');
const { isAdminRole } = require('../middlewares/validate.role.js');
const { isValidRole } = require('../helpers/db.validators.js');
const { getProductos } = require('../controllers/productos.controllers.js')

const router = Router();

router.get("/", getProductos);

module.exports = {
    router
}