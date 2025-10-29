const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);

const url = '/produtos';
let id = null;

describe('Testes do recurso /produtos', () => {
    test('POST / deve retornar 201 e JSON', async () => {
        const response = await request.post(url).send({nome:"Laranja",preco:10.00});
        expect(response.status).toBe(201);
        expect(response.body).not.toBeNull();
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.nome).toMatch('Laranja');
        expect(response.body.preco).toBeCloseTo(10.00,2);
        expect(response.body._id).toBeDefined();
        id = response.body._id;
        console.log('ID POST: ' + id);
        console.log('CORPO POST: ' + 'Nome:' + response.body.nome + ' Preco:' +response.body.nome+response.body.preco)
    });

    test('POST / deve retornar 422 e um JSON', async () => {
        const response = await request.post(url).send();
        expect(response.status).toBe(422);
        expect(response.body).toBeDefined();
        expect(response.body).not.toBeNull();
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.msg).toMatch('Nome e preço do produto são obrigatórios');
    });

    test('GET / deve retornar 200 e um array de objetos', async () => {
        const response = await request.get(url);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body).not.toBeNull();
        expect(Array.isArray(response.body)).toBeTruthy();
    });

    test('GET /id deve retornar 200 e um JSON', async () => {
        const response = await request.get(`${url}/${id}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body).not.toBeNull();
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body._id).toBeDefined();
        expect(response.body._id).not.toBeNull();
        expect(response.body.nome).toMatch('Laranja');
        expect(response.body.preco).toBeCloseTo(10.00,2);
    });

    test('GET /0 deve retornar 400 e um JSON', async () => {
        const response = await request.get(`${url}/0`);
        expect(response.status).toBe(400);
        expect(response.body).toBeDefined();
        expect(response.body).not.toBeNull();
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.msg).toMatch('Parâmetro inválido');
    });

    test('GET /000000000000000000000000 deve retornar 404 e um JSON', async () => {
        const response = await request.get(`${url}/000000000000000000000000`);
        expect(response.status).toBe(404);
        expect(response.body).toBeDefined();
        expect(response.body).not.toBeNull();
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.msg).toMatch('Produto não encontrado');
    });

    test('PUT /id deve retornar 200 e um JSON', async () => {
        const response = await request.put(`${url}/${id}`).send({nome:"Laranja Pera",preco:18.00});
        console.log(request.body)
        console.log('ID PUT 200: ' + id)
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body).not.toBeNull();
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body._id).toMatch(id);
        expect(response.body.nome).toMatch('Laranja Pera');
        expect(response.body.preco).toBeCloseTo(18.00,2);
    });

    test('PUT /id deve retornar 422 e um JSON', async () => {
        const response = await request.put(`${url}/${id}`).send({});
        expect(response.status).toBe(422);
        expect(response.body).toBeDefinded();
        expect(response.body).not.toBeNull();
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.msg).toMatch('Nome e preço do produto são origatórios');
    });

    test('PUT /0 deve retornar 400 e um JSON', async () => {
        const response = await request.put(`${url}/0`).send({});
        expect(response.status).toBe(400);
        expect(response.body).toBeDefinded();
        expect(response.body).not.toBeNull();
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.msg).toMatch('Parâmetro inválido');
    });

    test('PUT /000000000000000000000000 deve retornar 404 e um JSON', async () => {
        const response = await request.put(`${url}/000000000000000000000000`).send({});
        expect(response.status).toBe(404);
        expect(response.body).toBeDefinded();
        expect(response.body).not.toBeNull();
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.msg).toMatch('Produto não encontrado');
    });

    test('DELETE /id deve retornar 204 sem JSON', async () => {
        const response = await request.delete(`${url}/${id}`);
        expect(response.status).toBe(204);
        expect(response.body).toBeDefinded();
        expect(response.body).not.toBeDefinded();
        expect(response.body).toStrictEqual({})
    });

    test('DELETE /0 deve retornar 400 e um JSON', async () => {
        const response = await request.delete(`${url}/0`);
        expect(response.status).toBe(400);
        expect(response.body).toBeDefinded();
        expect(response.body).not.toBeDefinded();
        expect(response.body.msg).toMatch('Parâmetro inválido');
    });

    test('DELETE /id deve retornar 404 e um JSON', async () => {
        const response = await request.delete(`${url}/${id}`);
        expect(response.status).toBe(404);
        expect(response.body).toBeDefined();
        expect(response.body).not.toBeNull();
        expect(response.body.msg).toMatch('Produto não encontrado');
    });
});