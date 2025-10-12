const readline = require('readline-sync');
const controlador = require('./controlador');


async function main(){
    while(true){
        console.log("----- Menu de tarefas -----\n");
        console.log('1. Adicionar tarefa');
        console.log('2. Buscar tarefa');
        console.log('3. Buscar todas as tarefas');
        console.log('4. Atualizar tarefa');
        console.log('5. Remover tarefa');
        console.log('6. Sair');

        const opcao = readline.question("Escoha uma opção: ");

        switch(parseInt(opcao)){
            case 1: {
                console.log('\n[Adicionando contato]');
                const nome = readline.question('Digite o nome da tarefa: ');
                const tarefaAdicionada = await controlador.adicionarTarefa(nome);
                if(tarefaAdicionada){
                    console.log(`> Tarefa ${tarefaAdicionada.nome} adicionada com sucesso!`);
                };
                break;
            };
            case 2: {
                console.log('\n[Buscar tarefa]');
                const nome = readline.question('Digite o nome da tarefa: ');
                const tarefa = await controlador.buscarTarefa(nome);
                if(tarefa){
                    console.log(`> Tarefa encontrada:`);
                    console.log(` - ID: ${tarefa.id}`);
                    console.log(` - Nome: ${tarefa.nome}`);
                    console.log(` - Concluida: ${tarefa.concluida}`);
                }else{
                    console.log(`> A tarefa com o nome "${nome}" não foi encontrada...`);
                };
                break;
            };
            case 3 :{
                console.log(`\n[Buscar todas as tarefas]`);
                const todasTarefas = await controlador.buscarTodos();
                if(todasTarefas){
                    if(todasTarefas && todasTarefas.length > 0){
                        console.log("> Lista de todas as tarefas");
                        todasTarefas.forEach(tarefa => {
                            console.log(` - ID: ${tarefa._id}, Nome: ${tarefa.nome}, Concluida: ${tarefa.concluida}`)
                        });
                    };
                }else{
                    console.log("Nenhuma tarefa encontrada (isso não é bom...");
                };
                break;
            };
            case 4: {
                console.log('\n[Atualizar tarefa]');
                const nome = readline.question('Digite o nome da tarefa: ');
                const concluida = readline.question('Digite o status de conclusão da tarefa: ');
                const tarefaAtualizada  = await controlador.atualizarTarefa(nome,concluida);
                if(tarefaAtualizada){
                    console.log(`> Tarefa atualizada com sucesso!`);
                    console.log(` - ID: ${tarefaAtualizada.id}`);
                    console.log(` - Nome: ${tarefaAtualizada.nome}`);
                    console.log(` - Concluída: ${tarefaAtualizada.concluida}`);
                }else{
                    console.log(`> Tarefa não encontrada...`);
                };
                break;
            };
            case 5: {
                console.log('\n[Remover tarefa]');
                const nome = readline.question('Digite o nome da tarefa: ');
                const tarefaRemovida = await controlador.removerTarefa(nome);
                if(tarefaRemovida){
                    console.log(`> Tarefa removida com sucesso!`);
                }else{
                    console.log(`> Tarefa não encontrada...`)
                };
                break;
            };
            case 6: {
                console.log(`> Saíndo...`)
                process.exit(0);
            };
            default: {
                console.log("Opção inválida. Tente novamente!");
                break;
            };
        };
        readline.question('\nPressione ENTER para continuar...');
        };
};

main();