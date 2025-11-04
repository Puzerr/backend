const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddlewares');

router.post('/login', (req,res) => {
    const { usuario } = req.body;
    const payload = {
        email: usuario
    };
    try{
        return res.status(200).json({token: auth.gerarToken(payload)});
    } catch (err){
        return res.status(258).json({msg: 'Erro ao gerar token'});
    };
});

router.post('/renovar', auth.verificarToken, (req,res) => {
    const { email } = req.payload;
    const payload = {
        usuario: email
    };

    try{
        return res.status(200).json({token: auth.gerarToken(payload)})
    } catch (err){
        return res.status(500).json({msg: "Erro ao renovar token"});
    };
});

module.exports = router;