const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

/**
 * Generates the Swagger UI of the routes
 * @param {Express} app Express app object
 */
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
    apis: ['./src/routes/*.js'],
  };
  const specs = swaggerJsdoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}

module.exports = configSwagger;
