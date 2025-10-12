const {MongoClient} = require('mongodb');

const url = "mongodb+srv://usrPratica06:usrpratica06@cluster0.lzfnx52.mongodb.net/";

const client = new MongoClient(url);

async function conectaDb(){
    try{
        await client.connect();
        console.log("Conexão com o banco de dados feita com sucesso!");
        return client.db("agenda");
    } catch (e){
        console.log('Erro ao conectar ao MongoDB', e.message);
    };
};

module.exports = conectaDb;