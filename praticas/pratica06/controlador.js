const Tarefa = require('./modelo');

async function adicionarTarefa(nome){
    const tarefa = new Tarefa(nome);
    await tarefa.init();
    await tarefa.inserir();
};

async function buscarTarefa(nome){
    const tarefa = new Tarefa(nome);
    await tarefa.init();
    await tarefa.buscar();
    return tarefa;
};

async function atualizarTarefa(nome,concluida){
    const tarefa = new Tarefa(nome);
    await tarefa.init();
    await tarefa.buscar();
    
    if(tarefa._id){
        await tarefa.alterar(nome, concluida);
        return tarefa;
    }else return null;
};

async function removerTarefa(nome){
    const tarefa = new Tarefa(nome);
    await tarefa.init();
    await tarefa.buscar();

    if(tarefa._id){
        await tarefa.deletar(nome);
    }else return null;
};

module.exports = {adicionarTarefa,buscarTarefa,atualizarTarefa,removerTarefa};