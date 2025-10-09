const readline = require("readline-sync");
const conecta  = require("./database");

async function inserir(nomeTarefa){
    const db = await conecta();   
    const collection = db.collection("tarefas");
    const resultado = await collection.insertOne({
        nome:nomeTarefa,
        concluida:false
    });
    console.log(resultado);
};  

async function buscar(nomeTarefa){
    const db = await conecta();
    const collection = db.collection("tarefas");
    const resultado = await collection.findOne({
        nome:nomeTarefa
    });
    console.log(resultado);
};

async function alterar(nomeTarefa, nomeAlterado, concluidaAlterada){
    const db = await conecta();
    const collection = db.collection("tarefas");
    const resultado = await collection.updateOne({
        nome:nomeTarefa},{$set:{nome: nomeAlterado, concluida:concluidaAlterada}});
        console.log(resultado);
};

async function remover(nomeTarefa){
    const db = await conecta();
    const collection = db.collection("tarefas");
    const resultado = await collection.deleteOne({
        nome:nomeTarefa});
    console.log(resultado);
}

async function main(){
    while(true){
        console.log("Menu principal");
        console.log("1 - Criar tarefa");
        console.log("2 - Buscar tarefa");
        console.log("3 - Alterar tarefa");
        console.log("4 - Remover tarefa");
        console.log("5 - Sair\n");

        const opcao = readline.question("Entre com sua opção: ");
        switch(parseInt(opcao)){
            case 1: {
                const nomeTarefa = readline.question("Informe o nome da tarefa: ");
                await inserir(nomeTarefa);
                break;
            };
            case 2: {
                const nomeTarefa = readline.question("Informe o nome da tarefa: ");
                await buscar(nomeTarefa);
                break;
            };
            case 3: {
                const nomeTarefa = readline.question("Informe o nome da tarefa: ");
                const nomeAlterado = readline.question("Informe o novo nome da tarefa: ");
                const opcaoConcluida = readline.question("Informe o status da tarefa\n1 - concluída 2 - Não concluída");
                let concluidaAlterada;

                if(parseInt(opcaoConcluida) === 1 ){
                    concluidaAlterada = true 
                }else {
                    concluidaAlterada = false
                };
                alterar(nomeTarefa, nomeAlterado, concluidaAlterada)
            };
            case 4: {
                const nomeTarefa = readline.question("Informe o nome da tarefa: ");
                await remover(nomeTarefa);
            };
            case 5: process.exit(0);
        };
    };
};

main();