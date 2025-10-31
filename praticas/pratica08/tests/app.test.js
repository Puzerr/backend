const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);

const url = '/produtos';

describe('Testes unitários da Prática 08', () => {
    let token, tokenRenovado;

    test('GET /produtos retorna 401 e retornando um JSON de erro', async () => {
        const response = await request.get(url);

        expect(response.status).toBe(401);
        expect(response.body.msg).toMatch('Não autorizado');
    });

    test('GET / + parâmetro authorization retornando 401 e JSON de erro', async () => {
        const token = "123456789";
        const response = await request.get(url).set('authorization', `Bearer ${token}`);

        expect(response.status).toBe(401);
        expect(request.header['authorization']).toMatch('Bearer 123456789');
        expect(response.body.msg).toMatch('Tokwn inválido');
    });

    test('POST /usuarios/login envia um JSON "X", retornando 200 e um JSON', async () => {
        const response = await request.post(`${url}/login`).send({usuario:"email@exemplo.com",senha:"abcd1234"});
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body).toHaveProperty('token');
        token = response.body.token;
    });

    test('GET / com $token retorna 200 e um JSON', async () => {
        const response = await request.get(url).set('authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.header['content-header']).toMatch(/json/);
    });

    test('POST /usuarios/renovar com parâmetro authorization retorna 200 e um JSON', async () => {
        const response = await request.post(`${url}/usuarios/renovar`).set('authorizatin', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.header['content-type']).toMatch(/json/);
        expect(response.body).toHaveProperty('token');
        tokenRenovado = response.body.token;
    });

    test('GET / com $tokenRenovado retorna 200 e um JSON' async () => {
        const response = request.get(url).set('authorization', `Bearer ${tokenRenovado}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.header['content-type']).toMatch(/json/);
        expect(response.body).toHaveProperty('token');
    });
});