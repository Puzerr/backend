const conectaDb = require('./database');

class Tarefa{
    db = null;
    collection = null;

    async init(){
        this.db = await conectaDb();
        this.collection = db.collection('tarefas');
    }

    constructor(nome,concluida){
        this.id = null;
        this.nome = nome;
        this.concluida = concluida;
    };

    inserir(){
        const resultado = this.collection.insertOne({
            nome:this.nome,
            concluida:this.concluida
        });
        this.id = resultado.insertedId();
        return resultado;
    };

    alterar(nome,concluida){
        return this.collection.updateOne({_id:this.id},{$set:{nome:nome,concluida:concluida}});
    };

    deletar(){
        return this.collection.deleteOne({nome:this.nome});
    };

    buscar(){
        const resultado = this.collection.findOne({nome:this.nome});
        this.nome = resultado.nome;
        this.concluida = this.concluida;
        this.id = resultado._id;
        return this.id;
    };
};

module.exports = Tarefa;
