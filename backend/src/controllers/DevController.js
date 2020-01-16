const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray')

// se usa o async e o await nos casos de requisicao de API
// por ser uma etapa assincrona ou seja, nao tem como saber o tempo de resposta
// deve se colocar esses comandos pq caso nao tenha vai gerar direto para outra linha

// os detalhes de regras na questao da localizacao
// deve ser visto na documentacao de quem ira ser responsavel por isso
// no caso em questao é o mongoose

module.exports = { 
    // aqui dentro é onde esta programada as interacoes

    // no index ira retornar todos os devs cadastrados
    async index(request, response) {

        const devs = await Dev.find();

        return response.json(devs);

    },
    
    // no store sera responsavel por armazenar e filtrar
    // o usuario no banco de dados(mongoDB)
    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;
        
        let dev = await Dev.findOne({ github_username});

        if (!dev) {
            const apiResponse = await axios.get(`http://api.github.com/users/${github_username}`);

            const { name = login, avatar_url, bio } = apiResponse.data;

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })
        }

        return response.json(dev);
    },
};