const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String 
    },
    senha: {
        type: String
    }
});

module.exports = new mongoose.model('Usuario', userSchema);