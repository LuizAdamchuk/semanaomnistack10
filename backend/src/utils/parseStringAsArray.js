
// aqui ele faz o tratamento de um STR, isso quer dizer que 
// ira receber uma STR unica e entao ira retonar dividida e sem espacoes sobrando
// dessa maneira as varias tecnologias colocadas sao identificadas separadamente
// fazendo com que a busca seja especifica
// se separou assim essa funcao pq ela foi utilizada mais vezes no codigo
// pra nao ficar se repetindo se separa, cria a funcao e entao usa a funcao

module.exports = function parseStringAsArray(arrayAsString) {
    return arrayAsString.split(',').map(tech => tech.trim());
}