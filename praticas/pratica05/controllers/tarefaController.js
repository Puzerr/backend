const model = require('../models/tarefaModel');


const listar = (req,res) => {
    return res.status(200).json(model.listar);
};

const buscarPeloID = (req,res) => {
    const {id} = req.params;
    const resultado = model.buscarPeloId(id);
    if(resultado){
        return res.status(200).json(resultado);
    }
    return res.status(404).json({msg:"Tarefa não encontrada"});
};

const criar = (req,res) => {
    const resultado = model.criar(req.body);
    return res.status(201).json(resultado); 
};

const atualizar = (req,res) => {
    const { id } = req.params;
    const resultado = model.atualizar(req.body,id);
    if(resultado) {
        return res.status(200).json(resultado);
    };
    return res.status(404).json({msg:"Tarefa não encontrada"});
};

const remover = (req,res) => {
    const { id } = req.params;
    const tarefaApagada = model.remover(id);
    if(tarefaApagada) return res.status(204).end();
    return res.status(404).json({msg:"Tarefa não encontrada"});    
};

module.exports = {listar, buscarPeloID, criar, atualizar, remover};