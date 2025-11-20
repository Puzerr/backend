require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}`;

mongoose
.connect(url).then(console.log('Conexão estabelecida com sucesso!')).catch((err) => {console.log('Erro ao se conectar', err.message)});

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const routerApiDocs = require('./routes/apidocsRouter');
app.use('/api-docs', routerApiDocs);

const usuariosRouter = require('./routes/usuariosRouter');
app.use('/usuarios', usuariosRouter);

module.exports = app