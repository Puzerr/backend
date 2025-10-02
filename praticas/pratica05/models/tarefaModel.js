const tarefas = [];

const listar = () => {
    return tarefas;
};

const buscarPeloId = (id) => {
    const tarefaEncontrada = tarefas.find((tarefa) => tarefa.id === parseInt(id))
    return tarefaEncontrada;
};

const criar = (tarefa) => {
    const tarefaCriada = {
        ...tarefa,
        id:tarefas.length + 1
    };
    tarefas.push(tarefaCriada);
    return tarefaCriada;
};

const atualizar = (tarefa,id) => {
    const tarefaEncontrada = tarefas.find((tarefa) => tarefa.id === parseInt(id));
    if(tarefaEncontrada){
        tarefaEncontrada.nome = tarefa.nome;
        tarefaEncontrada.concluida = tarefa.concluida;
    };
    return tarefaEncontrada;
};

const remover = (id) => {
    const posicao = tarefas.findIndex((tarefa) => tarefa.id === parseInt(id));
    if(posicao >= 0){
        tarefas.splice(posicao, 1);
        return true;
    }else{
        return false;
    };
};

module.exports = {listar, buscarPeloId, criar, atualizar, remover};