require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const produtosRouter = require('./routes/produtosRouter');

const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}`;

mongoose
    .connect(url)
    .then(() => console.log('Conexão ao banco de dados bem sucedida!'))
    .catch((err) => {
        console.log("Erro ao conectar ao MongoDB: ", err.message);
    })

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/produtos', produtosRouter);

module.exports = app;
