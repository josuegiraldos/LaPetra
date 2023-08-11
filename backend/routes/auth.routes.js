const { Router } = require('express');
const { check } = require('express-validator');
const { login, logout } = require('../controllers/auth.controllers.js');
const { validateDocuments } = require('../middlewares/validate.documents.js');

const router = Router();

router.post("/login", [
    check('email', 'El email es obligatorio.').isEmail(),
    check('password', 'El password es obligatorio.').not().isEmpty(),
    validateDocuments
], login);

router.get('/logout', logout);

module.exports = router;