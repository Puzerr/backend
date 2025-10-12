const conectaDb = require('./database');

class Tarefa{
    async init(){
        this.db = await conectaDb();
        this.collection = this.db.collection('tarefas');
    };

    constructor(nome,concluida){
        this.id = null;
        this.nome = nome;
        this.concluida = concluida;
    };

    async inserir(){
        const resultado = await this.collection.insertOne({
            nome:this.nome,
            concluida:this.concluida
        });
        this.id = resultado.insertedId;
        return resultado;
    };

    async alterar(nome,concluida){
        return await this.collection.updateOne(
            {_id:this.id},
            {$set:{nome: nome, concluida: concluida}});
    };

    async deletar(){
        return await this.collection.deleteOne({nome:this.nome});
    };

    async buscar(){
        const resultado = await this.collection.findOne({nome:this.nome});
        if(resultado){
            this.nome = resultado.nome;
            this.concluida = resultado.concluida;
            this.id = resultado._id;
            return this;
        };
        return null;
    };
    static async buscarTudo(){
        const db = await conectaDb();
        const collection = db.collection('tarefas');

        const resultado = await collection.find({}).toArray();
        return resultado;
    };
};

module.exports = Tarefa;
