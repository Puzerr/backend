const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    preco: {
        type: Number,
        required: true
    }
});

module.exports = new mongoose.model('Produto', schema);