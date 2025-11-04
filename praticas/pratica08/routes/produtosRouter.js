const auth = require('../middlewares/authMiddlewares');
const express = require('express');
const router = express.Router();

router.get('/', auth.verificarToken, (req,res) => {
    const dados = [
        {"_id":1,"nome":"Bolo de Cenoura","quantidade_disponível":30,"preco":29.90},
        {"_id":2,"nome":"Bolo de mandioca","quantidade_disponivel":12,"preco":16.55},
        {"_id":3,"nome":"Suco de Pêssego","quantidade_disponivel":3,"preco":4.99}
    ];
    return res.status(200).json(dados);
});

module.exports = router;