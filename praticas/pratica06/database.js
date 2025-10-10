const {MongoClient} = require('mongodb');

const url = "mongodb+srv://usrPratica06:usrpratica06@cluster0.lzfnx52.mongodb.net/";

const client = new MongoClient(url);

async function conectaDb(){
    try{
        await client.connect();
        return client.db('agenda');
    } catch (e){
        console.log('Erro ao conectar ao MongoDB', e.message);
    };
};

module.exports = conectaDb;