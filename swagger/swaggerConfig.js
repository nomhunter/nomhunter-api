const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

function configSwagger(app) {
    const options = {
        swaggerDefinition: {
            openapi: '3.0.0',
            // Like the one described here: https://swagger.io/specification/#infoObject
            info: {
                title: 'NomHunter API',
                version: '0.0.0',
                description: 'NomHunter Express API',
            },
            basePath: '/',
        },
        // List of files to be processes. You can also set globs './routes/*.js'
        apis: ['./routes/*.js'],
    };
    const specs = swaggerJsdoc(options);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}

module.exports = configSwagger;