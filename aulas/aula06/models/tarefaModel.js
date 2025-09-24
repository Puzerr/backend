const tarefas = [];

const listar = () => {
    return tarefas;
};

const criar = (dados) => {
    const novaTarefa = {
        ...dados,
        id:tarefas.length + 1
    };
    tarefas.push(novaTarefa);
    return novaTarefa;
};

const obter = (id) => {
    const tarefaEncontrada = tarefas.find((item) => 
        item.id === parseInt(id));
    return tarefaEncontrada;
};

const atualizar = (id,dados) => {
    const tarefaEncontrada = tarefas.find((item) => 
        item.id === parseInt(id));
    if(tarefaEncontrada){
        tarefaEncontrada.nome = dados.nome;
        tarefaEncontrada.concluida = dados.concluida;
    };
    return tarefaEncontrada;
};

const apagar = (id) => {
    const posicao = tarefas.findIndex(item => 
        item.id === parseInt(id));
    if(posicao >= 0){
        tarefas.splice(posicao,1);
        return true;
    };
};

module.exports = {listar, criar, obter, atualizar, apagar};