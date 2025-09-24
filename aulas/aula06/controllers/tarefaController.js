const model = require('../models/tarefaModel');

const listarTarefas =  (req,res) => {
    res.json(model.listar());
};

const criarTarefas = (req,res) => {
    const novaTarefa = model.criar(req.body);
    res.status(201).json(novaTarefa);
};

const buscarTarefa = (req,res,next) => {
    const { id } = req.params;
    const tarefaEncontrada = model.obter(id);
    if(tarefaEncontrada){
    req.tarefas = tarefaEncontrada;
    return next();  
    };
    res.status(404).json({msg:'Tarefa não encontrada'});
};

const obterTarefas = (req,res) => {
    res.json(req.tarefas);
};

const atualizarTarefas = (req,res) => {
    const { id } = req.params;
    const tarefaEncontrada = model.atualizar(id,req.body);
    res.status(200).json(tarefaEncontrada);
};

const excluirTarefas = (req,res) => {
    const { id } = req.params;
    model.apagar(id)
    res.status(204).end();
};

module.exports = { listarTarefas, criarTarefas,buscarTarefa,obterTarefas, atualizarTarefas, excluirTarefas};