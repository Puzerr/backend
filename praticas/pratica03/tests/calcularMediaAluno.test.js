const { calcularMediaAluno}= require('../src/calcularMediaAluno.js');

test('Função CalcularMediaAluno Existe', function(){
    expect(calcularMediaAluno).toBeDefined();
});

test('Função CalcularMediaAluno a1, a2 indefinidos', function(){
    expect(() => calcularMediaAluno(null)).toThrow("Notas A1 ou A2 não informadas.");
});

test('Função CalcularMediaAluno a1, a2 negativos', function(){
    expect(() => calcularMediaAluno(-1, 2)).toThrow("Notas a1 ou a2 não podem ser negativas.");
});

test('Função CalcularMediaAluno a3 indefinido', function(){
    let media = (a1 * 0.4)+(a2 * 0.6);
    let a1 =6, a2 = 2;
    expect(calcularMediaAluno(a1,a2)).toBeCloseTo(media);
});

test('Função CalcularMediaAluno a3 negativo', () => {
    expect(() => calcularMediaAluno(1,1,-5)).toThrow("Nota a3 não pode ser negativa.");
});

test('Função CalcularMediaAluno a3 > a2', () => {
    expect(() => calcularMediaAluno(4,2,7).toBeCloseTo(media));
});

test('Função CalcularMediaAluno a3 > a1', () => {
    expect(() => calcularMediaAluno(4,6,5).toBeCloseTo(media));
});

test('Função CalcularMediaAluno melhor A1 e A3', () => {
    const media = calcularMediaAluno(7,6,9);
    expect(media).toBeCloseTo(6.4, 5);
});

test('Função CalcularMediaAluno melhor A2 e A3', () => {
    const media = calcularMediaAluno(3, 9, 8);
    expect(media).toBeCloseTo(8.6, 5);
});