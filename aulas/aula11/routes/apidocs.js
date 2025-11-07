const express = require('express');
const YAML = require('yaml');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');

//Carregar o arquivo swagger.yaml
const file = fs.readFileSync('./swagger.yaml', "utf8");

//Valida o foramto YAML
const swaggerDoc = YAML.parse(file);

//Cria middleware de rotas
const router = express.Router();

//Carrega a aplicação do swagger    
router.use('/', swaggerUi.serve);

//Renderiza a documentação
router.get('/', swaggerUi.setup(swaggerDoc));

module.exports = router;