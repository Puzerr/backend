
const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);
const url = '/usuarios';

describe('Testes rota /usuarios', () => {
    let id, token, tokenRenovado;

    test('POST /usuarios com JSON : retorna 201 e credenciais (JSON)', async () => {
        const response = await request.post(url).send({email:"usuario@email.com",senha:"abcd1234"});
        expect(response.status).toBe(201);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body._id).toBeDefined();
        expect(response.body.email).toMatch('usuario@email.com');
        id = response.body._id;
    });

    test('POST /usuarios sem JSON : retorna 422 e aviso (JSON)', async () => {
        const response = await request.post(url).send();
        expect(response.status).toBe(422);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.msg).toMatch('Email e Senha são obrigatórios');
    });

    test('POST /usuarios/login com JSON : retorna 200 e token (JSON)', async () => {
        const response = await request.post(`${url}/login`).send({
            email:'usuario@email.com',
            senha:'abcd1234'
        });
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.token).toBeDefined();
        token = response.body.token;
    });

    test('POST /usuarios/login sem JSON : retorna 401 e aviso (JSON)', async () => {
        const response = await request.post(`${url}/login`).send();
        expect(response.status).toBe(401);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.msg).toMatch('Credenciais inválidas');
    });

    test('POST /usuarios/renovar com authorization : retorna 200 e token (JSON)', async () => {
        await new Promise(r => setTimeout(r, 1500)); // Tempo para que o token se renove
        const response = await request.post(`${url}/renovar`).set({Authorization: `Bearer ${token}`});
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toHaveProperty('token');
        tokenRenovado = response.body.token;
    });

    test('POST /usuarios/renovar com authorization inválido : retorna 401 e aviso (JSON)', async () => {
        const response = await request.post(`${url}/renovar`).set({Authorization: 'Bearer 123456789'});
        expect(response.status).toBe(401);
        expect(response.body).toBeDefined();
        expect(response.body.msg).toMatch('Token inválido');
    });

    test('DELETE /usuarios/:id com authorization : retorna 204 sem JSON', async () => {
        const response = await request.delete(`${url}/${id}`).set({Authorization: `Bearer ${tokenRenovado}`});
        expect(response.status).toBe(204);
        expect(response.body).not.toBeNull();
        expect(response.body).toStrictEqual({});
    });
});
