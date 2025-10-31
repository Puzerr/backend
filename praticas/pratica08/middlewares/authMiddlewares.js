const jwt = require('jsonwebtoken');

function verificarToken(res,req,next){
    const { authorization } = req.headers;

    try{
        const token = authorization.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        if(payload){
            req.payload = 
        }
    } catch (err)[

    ];
};