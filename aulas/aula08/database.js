const { MongoClient } = require("mongodb");
const url = "mongodb+srv://usrTarefas:senhatarefa123@cluster0.lzfnx52.mongodb.net/";

const client = new MongoClient(url);

async function conecta(){
    try{
        await client.connect();
        return client.db("agenda");
    } catch (e){
        console.log("Erro ao conectar ao MongoDB", e.message);
    };
};

module.exports = conecta;