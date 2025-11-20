const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function verificarToken(req,res,next){
    const { authorization } = req.headers;
    try{
        const token = authorization.split(' ')[1];
        const usuario = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = {
            email: usuario.email
        };
        return next();
    }catch (err){
        return res.status(401).json({msg:'Token inválido'});
    };
};

function gerarToken(payload){
    const expiresIn = parseInt(process.env.JWT_EXPIRES, 10);
    try{
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
        return token;
    }catch (err){
        return Error('Erro ao gerar o token');
    };
};

function cifrarSenha(senha){
    const salto = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(senha, salto);
    return hash;
};

function compararSenha(senha, hash){
    const resultado = bcrypt.compareSync(senha, hash);
    return resultado;
};

module.exports = {verificarToken, gerarToken, cifrarSenha, compararSenha};