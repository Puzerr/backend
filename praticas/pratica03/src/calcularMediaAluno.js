function calcularMediaAluno(a1, a2, a3){
    let media = a1 * 0.4 + a2 * 0.6;
    if(a1 === null || a2 === null) throw Error("Notas A1 ou A2 não informadas.");

    if(a1 < 0 || a2 < 0) throw Error("Notas a1 ou a2 não podem ser negativas.");
    
    if(a3 === null){
        let media = (a1 * 0.4)+(a2 * 0.6);
        return media;
    }
    
    if(a3 < 0 ) throw Error("Nota a3 não pode ser negativa.");
    
    if(a3 > a2){
        media = (a1 * 0.4) + (a3 * 0.6);
    };

    if(a3 > a1){
        media = (a3 * 0.4) + (a2 * 0.6);
    }

    if(a3 === undefined){
        return media;
    };

    const combA1A3 = a1 * 0.4 + a2 * 0.6;
    const combA3A2 = a3 * 0.4 + a2 * 0.6;
    let max = Math.max(media, combA1A3, combA3A2);
    return max
};



module.exports = {calcularMediaAluno};