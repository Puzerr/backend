const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);

const urlProdutos = '/produtos';
const urlUsuarios = '/usuarios';

describe('Testes unitários da Prática 08', () => {
    let token, tokenRenovado;

    test('GET /produtos retorna 401 e retornando um JSON', async () => {
        const response = await request.get(urlProdutos);
        expect(response.status).toBe(401);
        expect(response.body.msg).toMatch('Não autorizado');
    });
    
    
    test('GET /produtos + parâmetro authorization retornando 401 e JSON de erro', async () => {
        const token = "Bearer 123456789";
        const response = await request.get(urlProdutos).set({Authorization: token});
        expect(response.status).toBe(401);
        expect(response.body.msg).toMatch('Token inválido');
    });
    
    test('POST /usuarios/login envia um JSON "X", retornando 200 e um JSON', async () => {
        const response = await request.post(`${urlUsuarios}/login`).send({usuario:"email@exemplo.com",senha:"abcd1234"});
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body).toHaveProperty('token');
        token = response.body.token;
    });

    test('GET /produtos com $token retorna 200 e um JSON', async () => {
        const response = await request.get(urlProdutos).set({Authorization: `Bearer ${token}`});
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.headers['content-type']).toMatch(/json/);
    });

    test('POST /usuarios/renovar com parâmetro authorization retorna 200 e um JSON', async () => {
        const response = await request.post(`${urlUsuarios}/renovar`).set({Authorization: `Bearer ${token}`});
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toHaveProperty('token');
        tokenRenovado = response.body.token;
    });

    test('GET /produtos com $tokenRenovado retorna 200 e um JSON', async () => {
        const dados = [
            {"_id":1,"nome":"Bolo de Cenoura","quantidade_disponível":30,"preco":29.90},
            {"_id":2,"nome":"Bolo de mandioca","quantidade_disponivel":12,"preco":16.55},
            {"_id":3,"nome":"Suco de Pêssego","quantidade_disponivel":3,"preco":4.99}
        ];  
        const response = await request.get(urlProdutos).set({Authorization: `Bearer ${tokenRenovado}`});
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.headers['content-type']).toMatch(/json/);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body).toEqual(dados);
    });
});