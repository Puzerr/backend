const jwt = require('jsonwebtoken');

function gerarToken(payload){
    const expiresIn = 120;
    try{
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn});
        return token;
    } catch (err){
        throw Error('Erro ao gerar token');
    };
};

function verificarToken(req,res,next){
    const { authorization } = req.headers;

    if(!authorization){
        return res.status(401).json({msg:"Não autorizado"});
    };

    try{
        const token = authorization.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        if(payload){
            req.payload = {
                email: payload.usuario,
                senha: payload.senha
            };
            return next();
        }
    } catch (err){
        return res.status(401).json({msg: 'Token inválido'});
    };
};



module.exports = {verificarToken, gerarToken};