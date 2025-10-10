const readline = require('readline-sync');
const controlador = require('./controlador');


function menu(){
    while(true){
        console.log('1. Adicionar contato');
        console.log('2. Buscar contato');
        console.log('3. Atualizar contato');
        console.log('4. Remover contato');
        console.log('5. Sair');

        const opcao = readline.question("Escoha uma opção: ");
        
        async function escolherOpcao(opcao){
            switch(parseInt(opcao)){
                case 1: {
                    console.log('\nAdicionando contato');
                    const nome = readline.question('Digite o nome da tarefa: ');
                    await controlador.adicionarTarefa(nome);
                    break;
                };
                case 2: {
                    console.log('\nBuscando contato');
                    const nome = readline.question('Digite o nome da tarefa: ');
                    controlador.buscarTarefa(nome);
                    break;
                };
                case 3: {
                    console.log('\nAtualizando contato');
                    const nome = readline.question('Digite o nome da tarefa: ');
                    console.log(await controlador.buscarTarefa(nome));
                    const concluida = readline.question('Digite o status de conclusão da tarefa: ');
                    await controlador.atualizarTarefa(nome,concluida);
                    break;
                };
                case 4: {
                    console.log('\nRemovendo contato');
                    const nome = readline.question('Digite o nome da tarefa: ');
                    await controlador.removerTarefa(nome);
                    break;
                };
                case 5: process.exit(0);
            };
        };
        escolherOpcao(opcao);
    };
};

menu();