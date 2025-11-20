const { token } = require('morgan');
const auth = require('../middlewares/authMiddleware');
const usuariosModel = require('../models/usuariosModel');
const bcrypt = require('bcryptjs');

async function criar(req,res){
    try{
        const senhaCifrada = auth.cifrarSenha(req.body.senha);
        const novoUsuario = await usuariosModel.create({email:req.body.email, senha:senhaCifrada});
        return res.status(201).json({_id:novoUsuario._id, email:novoUsuario.email});
    }catch (err){
        return res.status(422).json({msg: 'Email e Senha são obrigatórios'});
    };
};

async function entrar(req,res){
    try{
        const { email, senha } = req.body;
        if(!email || !senha) return res.status(401).json({msg:"Credenciais inválidas"});
        const usuarioEncontrado = await usuariosModel.findOne({email:email}).exec();
        const senhaIgual = auth.compararSenha(senha, usuarioEncontrado.senha);

        if(senhaIgual) {
            const token = auth.gerarToken({email:email});
            return res.status(200).json({token:token});
        };
        return res.status(401).json({msg:"Credenciais inválidas"});
    }catch (err){
        return res.status(500).json({msg:"Erro interno no servidor"});
    };
};

async function renovar(req,res){
    const tokenRenovado = auth.gerarToken({email:req.usuario.email});
    return res.status(200).json({token:tokenRenovado});
};

async function remover(req,res) {
    await usuariosModel.findOneAndDelete({_id:req.params.id});
    return res.status(204).end();
};

module.exports = {criar, entrar, renovar, remover};