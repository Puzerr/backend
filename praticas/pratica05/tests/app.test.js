const supertest = require('supertest');
const app = require('../app.js');
const request = supertest(app);

const url = '/tarefas';

describe('Testes da rota /tarefas', () => {
    let id;
    
    test('Verificar GET /tarefas retorna 200', async () => {
        const response  = await request.get(url);
        expect(response.status).toBe(200);
        expect(response.body).not.toBeNull();
        expect(response.headers['content-type']).toMatch(/json/);
        
    });
    
    test('Verificar GET /tarefas/1 retorna 404', async () => {
        const response = await request.get(`${url}/${id}`);
        expect(response.status).toBe(404);
        expect(response.body["msg"]).toMatch("Tarefa não encontrada");
    });
    
    test('Verificar POST /tarefas retorna 201', async () => {
        const response = await request.post(url).send({
            nome:"Estudar Node",
            concluida:false
        });
        expect(response.status).toBe(201);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body["nome"]).toMatch("Estudar Node");
        expect(response.body["concluida"]).toBeFalsy();
        id = response.body['id'];
        expect(response.body['id']).toBeDefined();
    });

    test('Verificar PUT /tarefas/1 retorna 200', async () => {
        const response = await request.put(`${url}/1`).send({
            nome:"Estudar Node e Express",
            concluida:true
        });
        expect(response.status).toBe(200);
        expect(response.body['nome']).toMatch('Estudar Node e Express');
        expect(response.body['concluida']).toBeTruthy();
    });

    test('Verificar PUT /tarefas/2 retorna 404', async () => {
        const response = await request.put(`${url}/2`);
        expect(response.status).toBe(404);
        expect(response.body["msg"]).toMatch("Tarefa não encontrada");
    });

    test('Verificar DELETE /tarefas/id retorna 204', async () => {
        const response = await request.delete(`${url}/${id}`);
        expect(response.status).toBe(204);
    });

    test('Verificar DELETE /tarefas/1 retorna 404', async () => {
        const response = await request.delete(`${url}/2`);
        expect(response.status).toBe(404);
        expect(response.header['content-type']).toMatch(/json/);
    });
});