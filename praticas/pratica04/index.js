const express = require('express');
const app = express();

const tarefas = [
    {id:1, nome:"Estudante Middleware",concluida:false},
    {id:2, nome:"Prática Express",concluida:true}
];

app.use(express.json());

app.use('/',(req, res, next) => {
    const DataAtual = new Date();
    console.log(`Data de requisição: ${DataAtual.getUTCDate()}/${DataAtual.getUTCMonth()}/${DataAtual.getUTCFullYear()} ${DataAtual.getUTCHours()}:${DataAtual.getUTCMinutes()}:${DataAtual.getUTCSeconds()}`);
    console.log(`Método utilizado: ${req.method}`);
    console.log(`URL de origem: ${req.url}`);
    next();
});

const router = express.Router();

app.use('/tarefas', router);

router.get('/', (req,res,next) => {
    res.json(tarefas);
});

router.get('/:tarefaID', (req,res,next) => {
    const {tarefaID} = req.params;
    const findID = tarefas.findIndex(r => r.id == tarefaID);
    if (findID >= 0) return res.json(tarefas[findID]);
    throw Error('Tarefa não localizada');
});

router.post('/', (req,res,next) => {
    tarefas.push(req.body);
    res.status(201).send(tarefas);
});

router.put('/:tarefaID', (req,res,next) => {
    const {tarefaID} = req.params;
    const findID = tarefas.findIndex(r => r.id == tarefaID);
    tarefas.splice((findID), 1, req.body);
    res.send(tarefas);
    throw Error('Tarefa não localizada');
});

router.delete('/:tarefaID', (req,res,next) => {
    const {tarefaID} = req.params;
    const findID = tarefas.findIndex(r => r.id == tarefaID);
    tarefas.splice((findID), 1);
    throw new Error('Tarefa não localizada');
});

app.use((err,req,res,next) => {
    res.status(400);
    res.send({Erro:err.message});
});

app.listen(3000, () => {
    console.log('AO VIVO');
});