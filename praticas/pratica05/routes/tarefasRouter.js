const express = require('express');
const router = express.Router();
const controller = require('../controllers/tarefaController.js');


router.get('/', controller.listar);

router.post('/', controller.criar);

router.get('/:id', controller.buscarPeloID);

router.put('/:id', controller.atualizar);

router.delete('/:id', controller.remover);

module.exports = router;

//OBSERVAÇÃO: como o request POST '/tarefas' só ocorre uma vez, há apenas uma tarefa criada.
//Isso significa que essa única tarefa possui ID:1.
//E para concluir os testes em que o ID = 1, e não ter conflito, optei por usar o ID:2.
//Dessa forma consigo simular caso um ID específico tente utilizar um recurso e sendo "barrado" (Erro 404).