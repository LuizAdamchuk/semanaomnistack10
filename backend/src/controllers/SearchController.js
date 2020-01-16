const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray')

// aqui é onde se configura a busca do programa
// ira colocar as regras de como e o que buscar
// o diferencial é que ira tbm contar com a geolocalizacao
// outro filtro colocado é por tecnologia

module.exports = {

    async index(request, response) {
        
        const { latitude, longitude, techs } = request.query;

        const techsArray = parseStringAsArray(techs);
        
        //aqui é onde esta os filtros
        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },

        });

        console.log(techsArray);

        return response.json({ devs })
    }

}