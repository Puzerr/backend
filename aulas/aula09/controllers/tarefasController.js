const Tarefa = require('../models/tarefasModel.js');    

async function listar(req,res){
    try {
        const tarefas = await Tarefa.find({});
        return res.json(tarefas);
    } catch (err){
        return res.status(500).json({msg:"Deu ruim!" + err.message});
    };
};

async function criar(req,res){
    try {
        const { corpo } = req.body;
        const tarefa = await Tarefa.create({corpo})
        return res.status(201).json(tarefa);
    } catch (err){
        return res.status(500).json({msg:"Deu ruim!" + err.message});
    }
};

async function buscar(req,res,next){
    const { id } = req.params;
    const tarefa = Tarefa.findOne({_id:id});
    next();
};

async function exibir(req,res){
    return res.status(200).json({});
};

async function atualizar(req,res){
    const { id } = req.params;
    console.log("AQUI CARAIO: >>>",id)
    const tarefaAtualiza = await Tarefa.findOneAndUpdate({_id:id},{...req.body});
    res.json(tarefaAtualiza);
};

async function remover(req,res){
    const { id } = req.params;
    const tarefaRemovida = await Tarefa.findOneAndDelete({_id:id});
    return res.status(204).end();
};

module.exports = {listar, criar, buscar, exibir, atualizar, remover};