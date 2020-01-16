const mongoose = require('mongoose');

// aqui foi feito as configurações de uso das coordanadas geograficas
// foi feito em uma maneira separada para que se possa utilizar no futuro
// caso utilize localizacao para outras coisas(eventos, empresas, etc)

// para usar a ferramenta de localizacao ira se usar o mongo
// é necessario olhar a documentacao para entender as regras de uso

const PointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    },
});

module.exports = PointSchema;