var express = require('express');
var router = express.Router();

const auth = require('../middlewares/auth');

router.post('/login', (req,res) => {
    const { username, password } = req.body;

    if(username === "raphael.ferraz@iesb.edu.br" && password === "minhasenha123"){
        const payload = {
            email: username,
            nome: "Raphael"
        };

        try{
            return res.json({token: auth.generateToken(payload)});
        } catch (err){
            return res.status(500).json({msg: err.message});
        };
    };

    return res.status(401).json({msg: "Credenciais inválidas"});
    });

module.exports = router;
