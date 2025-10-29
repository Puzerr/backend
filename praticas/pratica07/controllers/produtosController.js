const mongoose = require('mongoose');
const Produto = require('../models/produtosModels');

async function criar(req,res){
    try{
        if(!req.body.nome || req.body.preco === undefined){
            return res.status(422).json({msg:'Nome e preço do produto são obrigatórios'});
        };

        const novoProduto = await Produto.create({
            nome:req.body.nome,
            preco:req.body.preco
        });

        if(novoProduto){
            return res.status(201).json(novoProduto);
        };
        
    } catch (err){
        if(err.erros){
            return res.status(500).json({msg:'Erro interno no servidor'});
        };
    };
};

async function listar(req,res){
    try{
        const produtosCadastrados = await Produto.find({});

        if(produtosCadastrados){
            return res.status(200).json(produtosCadastrados);
        };

        return res.status(404).json({msg:'Nenhum produto encontrado'})
        
    } catch (err){
        if(err.erros){
            return res.status(500).json({msg:'Erro interno no servidor'});
        };
    };
};

async function buscar(req,res,next){
    try{
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({msg:'Parâmetro inválido'});
        };

        const produtoEncontrado = await Produto.findOne({_id:id});

        if(produtoEncontrado){
            req.produto = produtoEncontrado;
            next();
        };
        return res.status(404).json({msg:'Produto não encontrado'});
    } catch (err){
        if(err.erros){
            return res.status(500).json({msg:'Erro interno no servidor'});
        };
    };
};

function exibir(req,res){
    try{
        return res.status(200).json(req.produto);
    } catch (err){
        if(err.erros){
            return res.status(500).json({msg:'Erro interno no servidor'});
        };
    };
};

async function atualizar(req,res){
    try{
        const {id} = req.params;
        const produtoAtualizado = await Produto.findOneAndUpdate(
            {_id:id},
            {...req.body},
            {runValidators:true}
        );

        if(produtoAtualizado){
            return res.status(200).json(produtoAtualizado);
        };

        return res.status(422).json({msg:'Nome e preço do produto são obrigatórios'});
    } catch (err){
        if(err.errros){
            return res.status(500).json({msg:'Erro interno no servidor'})
        };
    };
};

async function remover(req,res){
    try{
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({msg:'Parâmetro inválido'});
        };

        const produtoRemovido = await Produto.findOneAndDelete({_id:id});
        
        if(produtoRemovido){
            return res.status(204).end();
        };

        return res.status(404).json({msg:'Produto não encontrado'});
    } catch (err){
        if(err.erros){
            return res.status(500).json({msg:'Erro interno no servidor'});
        };
    };
};

module.exports = {criar, listar, buscar, exibir, atualizar, remover};