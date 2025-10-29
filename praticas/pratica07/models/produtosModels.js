const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        min: 3
    },
    preco: {
        type: Number,
        required: true
    }
});

module.exports = new mongoose.model('Produto', schema);