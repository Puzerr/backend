const Tarefa = require('./modelo');

async function buscarTodos(){
    return Tarefa.buscarTudo();
};

async function adicionarTarefa(nome){
    const tarefa = new Tarefa(nome, false);
    await tarefa.init();
    await tarefa.inserir();
    return tarefa;
};

async function buscarTarefa(nome){
    const tarefa = new Tarefa(nome);
    await tarefa.init();
    const tarefaEncontrada = await tarefa.buscar();
    return tarefaEncontrada;
};

async function atualizarTarefa(nome,concluida){
    const tarefa = new Tarefa(nome);
    await tarefa.init();
    await tarefa.buscar();
    
    if(tarefa.id){
        const statusConcluida = (String(concluida).toLowerCase() === 'true');
        await tarefa.alterar(nome, statusConcluida);
        return tarefa;
    }else {
        null;
    }
};

async function removerTarefa(nome){
    const tarefa = new Tarefa(nome);
    await tarefa.init();
    await tarefa.buscar();

    if(tarefa.id){
        await tarefa.deletar(nome);
        return tarefa;
    }else{
        return null;
    };
};

module.exports = {adicionarTarefa,buscarTarefa,atualizarTarefa,removerTarefa,buscarTodos};