const jwt = require('jsonwebtoken');

function verifyToken(req,res,next){
    const { auth } = req.headers;

    try{
        const payload = jwt.verify(auth, process.env.JWT_SECRET);
        req.payload = payload;
        return next();
    } catch (err){
        return res.status(401).json({msg:"Token inválido"});
    };
};

function generateToken(payload){
    try{
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        return token;
    } catch (err){
        throw Error("Erro ao gerar token");
    };
};

module.exports = {verifyToken, generateToken};