const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const auth = require('../middlewares/authMiddleware');


router.post('/login', usuariosController.entrar)

router.post('/renovar', auth.verificarToken, usuariosController.renovar);

router.post('/', usuariosController.criar);

router.delete('/:id', auth.verificarToken, usuariosController.remover);

module.exports = router;